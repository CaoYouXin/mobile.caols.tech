import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { setBrief, getPosts } from '../../action';
import { FancyList } from '../fancylist';
import { CategoryList } from '../plainlist';
import { getPage } from '../../store/posts/pager';

const PostList = connect(
  (state) => ({
    listData: getPage(state.posts.list, state.posts.pager),
    actives: state.posts.actives,
    pager: state.posts.pager
  }),
  (dispatch) => ({
    fetchPosts: (cb) => {
      dispatch(getPosts(cb));
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
)(FancyList);

class HomeComponent extends Component {
  componentDidMount() {
    const { setHeader } = this.props;
    setHeader();
  }

  render() {
    return (
      <div>
        <PostList></PostList>
        <CategoryList></CategoryList>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    setHeader: () => {
      dispatch(setBrief(false));
    }
  })
)(HomeComponent);