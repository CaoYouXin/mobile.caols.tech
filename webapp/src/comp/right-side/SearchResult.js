import React, { Component } from 'react';
import './SearchResult.css';
import { calcClassName } from '../../util';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRightSide } from '../../action';
import ArticlePostItem from './article/Item';
import AppPostItem from './app/Item';

class SearchResultComponent extends Component {
  render() {
    const { active, close, categories, posts } = this.props;
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
        {
          categories && categories.map(category => (
            <div key={category.BlogCategoryId} onClick={close}><Link to={`/category/${category.BlogCategoryId}`}>{category.BlogCategoryName}</Link></div>
          ))
        }
        {
          posts && posts.length && <ul className="list">
            {
              posts.map(post => {
                switch (post.BlogPostType) {
                  case 2:
                    return <ArticlePostItem key={post.BlogPostId} post={post} onClick={close} />
                  case 1:
                    return <AppPostItem key={post.BlogPostId} post={post} onClick={close} />
                  default:
                    throw new Error(`unknown post type ${post.BlogPostType}`);
                }
              })
            }
          </ul>
        }
      </div>
    </div>);
  }
}

export default connect(
  (state) => ({
    active: state.rightSide.active,
    categories: state.rightSide.categories,
    posts: state.rightSide.posts
  }),
  (dispatch) => ({
    close: () => {
      dispatch(setRightSide(false));
    }
  })
)(SearchResultComponent);