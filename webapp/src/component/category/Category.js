import React, { Component } from 'react';
import './Category.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBrief, getCategoryByName, getPostByCategoryName } from '../../action';
import { getUrl } from '../../api';
import { FancyListComponent } from '../homepage-posts/FancyList';
import { getPage } from '../../store/category/pager';

const Posts = withRouter(connect(
  (state) => ({
    listData: getPage(state.category.posts, state.category.pager),
    actives: state.category.actives,
    pager: state.category.pager
  }),
  (dispatch) => ({
    fetchPosts: (cb) => {
    },
    more: () => {
      dispatch({
        type: 'Post_by_CategoryName_more'
      });
    },
    go: (go) => {
      dispatch({
        type: 'Post_by_CategoryName_Pager_Go',
        go
      });
    }
  })
)(FancyListComponent));

class CategoryComponent extends Component {
  componentDidMount() {
    const { setHeader, match, fetchCategory } = this.props;
    setHeader();
    fetchCategory(match.params.categoryName);
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props;

    if (!!category) {
      getUrl(`http://${document.domain}:8082${category.url}`).then(html => {
        this.contentEl.innerHTML = html;
        let scriptElem = document.createElement('script');
        scriptElem.src = `http://${document.domain}:8082${category.script}`;
        // scriptElem.onload = function () {
        //   console.log('halo');
        // };
        this.contentEl.appendChild(scriptElem);
      });
    } 
  }

  render() {
    const { match, category } = this.props;
    return (
      <div>
        <h1>{match.params.categoryName}</h1>
        {
          category && <div className="App-btns two in-middle">
            <div className="App-btn">{category.create} 创建</div>
            <div className="App-btn">{category.update} 更新</div>
          </div>
        }
        <div ref={content => this.contentEl = content} className="category-content"></div>
        <Posts />
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    category: state.category.category
  }),
  (dispatch) => ({
    setHeader: () => {
      dispatch(setBrief(true));
    },
    fetchCategory: (categoryName) => {
      dispatch(getCategoryByName(categoryName));
      dispatch(getPostByCategoryName(categoryName));
    }
  })
)(CategoryComponent));