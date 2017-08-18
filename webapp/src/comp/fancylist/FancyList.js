import React, { Component } from 'react';
import './FancyList.css';
import { AppItem } from './app';
import { PostItemWithRouter } from './post';
import { calcClassName } from '../../util';
import forEach from 'foreach';
import deepEqual from 'deep-equal';

export class FancyList extends Component {

  constructor(props) {
    super(props);
    this.last_known_scroll_position = 0;
    this.ticking = false;

    this.scrollHander = this.scrollHander.bind(this);
    this.frame = this.frame.bind(this);
    this.checkMore = this.checkMore.bind(this);
    this.more = this.more.bind(this);
  }

  componentDidMount() {
    const { fetchPosts, listData } = this.props;

    window.addEventListener('scroll', this.scrollHander);

    if (listData.length) {
      return;
    }
    fetchPosts(this.more);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    window.removeEventListener('scroll', this.scrollHander);
  }

  componentDidUpdate(prevProps) {
    const { categoryId: prevCategoryId, listData: prevListData } = prevProps;
    const { categoryId, fetchPosts, listData } = this.props;

    if (prevCategoryId !== categoryId) {
      fetchPosts(this.more);
    }

    if (!deepEqual(prevListData, listData)) {
      this.checkMore(window.scrollY);
    }
  }

  render() {
    const { listData, actives, pager, go } = this.props;
    return (
      <div className="fancy-list-root">
        {
          listData && listData.map((data, idx) => {
            switch (data.BlogPostType) {
              case 2:
                return <PostItemWithRouter key={data.BlogPostId} active={actives[idx]} data={data}></PostItemWithRouter>;
              case 1:
              default:
                return <AppItem key={data.BlogPostId} active={actives[idx]} data={data}></AppItem>
            }
          })
        }
        <div className="pager-wrapper">
          {this.calcPager(pager).map((page, idx) => (
            <div key={idx} className={calcClassName({
              "pager": true,
              "active": page.text === pager.page + ''
            })} onClick={(e) => go(page.go)}>{page.text}</div>
          ))}
        </div>
      </div>
    );
  }

  scrollHander(e) {
    this.last_known_scroll_position = window.scrollY;
    if (!this.ticking) {
      window.requestAnimationFrame(this.frame);
    }
    this.ticking = true;
  }

  frame() {
    this.checkMore(this.last_known_scroll_position);
    this.ticking = false;
  }

  more() {
    const { more: getMore, listData } = this.props;
    if (!listData || document.querySelectorAll('.fancy-list-item.active').length === listData.length) {
      return;
    }

    getMore();

    this.timeout = setTimeout(this.checkMore, 1200, window.scrollY);
  }

  checkMore(scroll_pos) {
    const { listData } = this.props;

    const rootElem = document.querySelector('.fancy-list-root');
    let height = rootElem.offsetTop - scroll_pos;

    const activedItems = document.querySelectorAll('.fancy-list-item.active');
    if (!listData || activedItems.length === listData.length) {
      return;
    }

    forEach(activedItems, item => {
      height += item.offsetHeight + 20;
    });

    if (window.innerHeight - height > 100) {
      this.more();
    }
  }

  calcPager(pager) {
    let state = 'first';
    let count = 0;
    let index = 1;
    let ret = [];
    for (let i = 0; i < 9; i++) {
      if (index > pager.total) {
        return ret;
      }
      switch (state) {
        case 'first':
          ret.push({
            text: '' + index,
            go: index - pager.page
          });
          index++;
          state = 'second';
          break;
        case 'second':
          const isContinue = index === pager.page - 2
            || index === pager.page - 1 || index === pager.page
            || index + 1 === pager.page - 2 || index - 1 === pager.page;
          ret.push({
            text: isContinue ? '' + index : '~~~',
            go: isContinue ? index - pager.page : null
          });
          index++;
          state = 'count';
          count = 0;
          break;
        case 'count':
          ret.push({
            text: '' + index,
            go: index - pager.page
          });
          index++;
          count++;
          if (count === 5) {
            state = 'last_two';
          }
          break;
        case 'last_two':
          const isContinue2 = pager.total - 1 === pager.page + 3
            || pager.total === pager.page + 3;
          ret.push({
            text: isContinue2 ? '' + index : '~~~',
            go: isContinue2 ? index - pager.page : null
          });
          state = 'last_one';
          break;
        case 'last_one':
          ret.push({
            text: '' + pager.total,
            go: pager.total - pager.page
          });
          return ret;
        default:
          throw new Error(`unknown state ${state}`);
      }
    }
  }

}