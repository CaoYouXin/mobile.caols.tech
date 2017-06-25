import React, { Component } from 'react';
import './SearchResult.css';
import { calcClassName } from '../../util';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRightSide } from '../../action';
import ArticlePostItem from '../list/post/article/Item';
import AppPostItem from '../list/post/app/Item';

class SearchResultComponent extends Component {
  render() {
    const { active, close, type, categories, posts } = this.props;
    return (<div>
      <div className={calcClassName({
        "search-result-root": true,
        "search-result-root-mask": true,
        "active": active
      })} onClick={(e) => close()}></div>
      <div className={calcClassName({
        "search-result-root": true,
        "search-result-root-main": true,
        "active": active
      })}>
        <h1>搜索结果</h1>
        {{
          "category": categories.map(category => (
            <div key={category.name} onClick={close}><Link to={`/category/${category.name}`}>{category.name}</Link></div>
          )),
          "post": (
            <ul className="list">
              {
                posts.map(post => {
                  switch (post.type) {
                    case 'Article':
                      return <ArticlePostItem key={post.id} post={post} onClick={close} />
                    case 'App':
                      return <AppPostItem key={post.id} post={post} onClick={close} />
                    default:
                      throw new Error(`unknown post type ${post.type}`);
                  }
                })
              }
            </ul>
          )
        }[type]}
      </div>
    </div>);
  }
}

export default connect(
  (state) => ({
    active: state.rightSide.active,
    type: state.rightSide.type,
    categories: state.rightSide.categories,
    posts: state.rightSide.posts
  }),
  (dispatch) => ({
    close: () => {
      dispatch(setRightSide(false));
    }
  })
)(SearchResultComponent);