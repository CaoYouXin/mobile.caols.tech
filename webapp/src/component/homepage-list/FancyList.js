import React, { Component } from 'react';
import './FancyList.css';
import defaultCover from './article.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPost, setBrief } from '../../action';
import calcClassName from '../../util/calcClassName';

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
    const { fetchPosts, setHeader } = this.props;

    setHeader();
    fetchPosts(this.more.bind(this));

    window.addEventListener('scroll', this.scrollHander);
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

    activedItems.forEach(item => {
      height += item.offsetHeight + 20;
    });

    if (window.innerHeight - height > 100) {
      this.more();
    }
  }

  articleClicked(articleName) {
    const { history } = this.props;
    history.push(`/post/${articleName}`);
  }

  render() {
    const { listData, actives } = this.props;

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
                    <img src={data.screenshot || defaultCover} alt={data.name} width="128" height="128" />
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
            default:
              throw new Error(`unknown type : ${data.type}`);
          }
        })}
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    listData: state.posts.list,
    actives: state.posts.actives
  }),
  (dispatch) => ({
    fetchPosts: (cb) => {
      dispatch(getPost(cb));
    },
    more: () => {
      dispatch({
        type: 'more'
      });
    },
    setHeader: () => {
      dispatch(setBrief(false));
    }
  })
)(FancyListComponent));