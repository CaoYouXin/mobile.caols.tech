import React, { Component } from "react";
import "./Post.css";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setBrief, getPostByName, getTop5, getPrevPost, getNextPost, getPostByCategoryName, like } from '../../action';
import { getUrl } from '../../api';

class PostComponent extends Component {
  componentDidMount() {
    const { match, fetch } = this.props;
    fetch(setBrief(true));
    fetch(getPostByName(match.params.postName));
    fetch(getTop5());
    this.justMount = true;
  }

  componentDidUpdate(prevProps) {
    const { post: prevPost, match: prevMatch } = prevProps;
    const { post, match, fetch } = this.props;
    if (prevMatch.params.postName !== match.params.postName) {
      fetch(getPostByName(match.params.postName));
    }

    if (!!post && (!prevPost || prevPost.url !== post.url || this.justMount)) {
      this.justMount = false;
      getUrl(`http://${document.domain}:8082${post.url}`).then(html => {
        this.contentEl.innerHTML = html;
        let scriptElem = document.createElement('script');
        scriptElem.src = `http://${document.domain}:8082${post.script}`;
        // scriptElem.onload = function () {
        //   console.log('halo');
        // };
        this.contentEl.appendChild(scriptElem);
      });

      fetch(getPrevPost(post.update));
      fetch(getNextPost(post.update));
    }
  }

  componentWillUnmount() {
    this.justMount = false;
  }

  render() {
    const { match, post, prev, next, top5, goCategory, processLike } = this.props;
    return (
      <div className="App-post">
        <h1>{match.params.postName}</h1>
        {
          post && <div className="App-btns two in-middle">
            <div className="App-btn">{post.create} 创建</div>
            <div className="App-btn">{post.update} 更新</div>
          </div>
        }
        {
          post && <div className="box-wrapper">
            <div className="category box" onClick={() => goCategory(post.categoryName)}>
              <i></i>
              <span>{post.categoryName}</span>
            </div>
            <div className="like box" onClick={() => processLike(post.id)}>
              <i></i>
              <span>{post.like}</span>
            </div>
          </div>
        }
        <div ref={content => this.contentEl = content} className="article-content"></div>
        {
          post && <div className="box-wrapper">
            <div className="category box" onClick={() => goCategory(post.categoryName)}>
              <i></i>
              <span>{post.categoryName}</span>
            </div>
            <div className="like box" onClick={() => processLike(post.id)}>
              <i></i>
              <span>{post.like}</span>
            </div>
          </div>
        }
        {
          prev && next && <div className="App-btns two in-middle">
            <div className="App-btn">上一篇: {
              prev.name === '没有上一篇了' ?
                prev.name :
                <Link to={`/post/${prev.name}`}>{prev.name}</Link>
            }</div>
            <div className="App-btn">下一篇: {
              next.name === '没有下一篇了' ?
                next.name :
                <Link to={`/post/${next.name}`}>{next.name}</Link>
            }</div>
          </div>
        }
        <div className="top5">
          <p>TOP 5: </p>
          <ol className="top5">
            {top5.map(top => (
              <li key={top.id}><Link to={`/post/${top.name}`}>{top.name}</Link></li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    post: state.post,
    prev: state.prev,
    next: state.next,
    top5: state.top5
  }),
  (dispatch, ownProps) => ({
    fetch: dispatch,
    goCategory: (categoryName) => {
      dispatch(getPostByCategoryName(categoryName));
      ownProps.history.push('/');
    },
    processLike: (postId) => {
      dispatch(like(postId));
    }
  })
)(PostComponent));