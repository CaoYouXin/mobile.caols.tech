import React, { Component } from "react";
import "./List.css";
import { connect } from 'react-redux';
import { getPage } from '../../store';
import { getCategory, getPost, setBrief } from '../../action';
import CategoryItem from './category/Item';
import PostItem from './post/Item';

class ListComponent extends Component {
  componentDidMount() {
    const { setBriefToFalse, selectCategory, listData } = this.props;
    setBriefToFalse();
    if (listData.length === 0) {
      selectCategory();
    }
  }

  render() {
    const { prev, next, pager, listData, listType, selectCategory, selectPost } = this.props;

    let items = null;
    switch (listType) {
      case 'Category':
        items = listData.map(category => (
          <CategoryItem key={category.id} category={category} />
        ));
        break;
      case 'Post':
        items = listData.map(post => (
          <PostItem key={post.id} post={post} />
        ));
        break;
      default:
        throw new Error(`unknown select ${listType}`);
    }

    return (
      <div className="App-list">
        <div className="App-btns two v-mid-box">
          <div className={listType === 'Category' ? "App-btn active" : "App-btn"}
            onClick={selectCategory}>分类</div>
          <div className={listType === 'Post' ? "App-btn active" : "App-btn"}
            onClick={selectPost}>Post</div>
        </div>
        <div className="App-btns three v-mid-box">
          <div className="App-btn"><a href="" onClick={e => prev(e)}>Prev</a></div>
          <div className="App-btn">{pager.page} / {pager.total}</div>
          <div className="App-btn"><a href="" onClick={e => next(e)}>Next</a></div>
        </div>
        <ul className="list">
          {items}
        </ul>
        <div className="App-btns three v-mid-box">
          <div className="App-btn"><a href="" onClick={e => prev(e)}>Prev</a></div>
          <div className="App-btn">{pager.page} / {pager.total}</div>
          <div className="App-btn"><a href="" onClick={e => next(e)}>Next</a></div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    listData: getPage(state.listData, state.pager),
    listType: state.listType,
    pager: state.pager
  }),
  (dispatch) => ({
    prev: (e) => {
      e.preventDefault();
      dispatch({
        type: 'go',
        go: -1
      })
    },
    next: (e) => {
      e.preventDefault();
      dispatch({
        type: 'go',
        go: 1
      })
    },
    setBriefToFalse: () => {
      dispatch(setBrief(false));
    },
    selectCategory: () => {
      dispatch(getCategory())
    },
    selectPost: () => {
      dispatch(getPost())
    }
  })
)(ListComponent);
