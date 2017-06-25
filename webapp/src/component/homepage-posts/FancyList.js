import React, { Component } from 'react';
import './FancyList.css';
import defaultCover from './article.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPost } from '../../action';
import { calcClassName } from '../../util';
import { getPage } from '../../store/posts/pager';
import forEach from 'foreach';

class FancyListComponent extends Component {
  constructor(props) {
    super(props);
    this.last_known_scroll_position = 0;
    this.ticking = false;

    this.frame = this.frame.bind(this);
    this.scrollHander = this.scrollHander.bind(this);
    this.articleClicked = this.articleClicked.bind(this);
    this.checkMore = this.checkMore.bind(this);
  }

  componentDidMount() {
    const { fetchPosts, listData } = this.props;

    window.addEventListener('scroll', this.scrollHander);

    if (listData.length) {
      return;
    }
    fetchPosts(this.more.bind(this));
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    window.removeEventListener('scroll', this.scrollHander);
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
    const { more, listData } = this.props;
    if (!listData || document.querySelectorAll('.fancy-list-item.active').length === listData.length) {
      return;
    }

    more();

    this.timeout = setTimeout(this.checkMore, 1200, window.scrollY);
  }

  checkMore(scroll_pos) {
    const { listData } = this.props;

    let height = 500 - scroll_pos;
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

  articleClicked(articleName) {
    const { history } = this.props;
    history.push(`/post/${articleName}`);
  }

  appClicked(url) {
    window.open(`http://${document.domain}:8082${url}`);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listData !== this.props.listData) {
      document.body.scrollTop = 0;
      this.more();
    }
  }

  render() {
    const { listData, actives, pager, go } = this.props;

    return (
      <div className="fancy-list-root">
        {listData && listData.map((data, idx) => {
          switch (data.type) {
            case 'Article':
              return (
                <div key={data.id} className={calcClassName({
                  "fancy-list-item": true,
                  "active": actives[idx]
                })} onClick={(e) => this.articleClicked(data.name)}>
                  <div className="fancy-list-cover">
                    <img src={!!data.screenshot ? `http://${document.domain}:8082${data.screenshot}` : defaultCover}
                      alt={data.name} width="128" height="128" />
                  </div>
                  <div className="fancy-list-date">
                    {new Date(data.update).toDateString()}
                  </div>
                  <div className="fancy-list-title">
                    <h1>{data.name}</h1>
                  </div>
                  <div className="fancy-list-brief">
                    {data.brief}
                  </div>
                </div>
              );
            case 'App':
              return (
                <div key={data.id} className={calcClassName({
                  "fancy-list-item": true,
                  "active": actives[idx]
                })} onClick={(e) => this.appClicked(data.url)}>
                  <div className="fancy-list-screenshot">
                    <img src={`http://${document.domain}:8082${data.screenshot}`} alt={data.name} />
                  </div>
                  <div className="fancy-list-date">
                    {new Date(data.update).toDateString()}
                  </div>
                  <div className="fancy-list-title">
                    <h1>{data.name}</h1>
                  </div>
                </div>
              );
            default:
              throw new Error(`unknown type : ${data.type}`);
          }
        })}
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
}

export default withRouter(connect(
  (state) => ({
    listData: getPage(state.posts.list, state.posts.pager),
    actives: state.posts.actives,
    pager: state.posts.pager
  }),
  (dispatch) => ({
    fetchPosts: (cb) => {
      dispatch(getPost(cb));
    },
    more: () => {
      dispatch({
        type: 'Posts_more'
      });
    },
    go: (go) => {
      dispatch({
        type: 'Post_Pager_Go',
        go
      });
    }
  })
)(FancyListComponent));

export { FancyListComponent };