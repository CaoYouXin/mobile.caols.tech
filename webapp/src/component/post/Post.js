import React, { Component } from "react";
import "./Post.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setBrief, getPostByName } from '../../action';
import { getUrl } from '../../api';

class PostComponent extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.fetch(setBrief(true));
    this.props.fetch(getPostByName(match.params.postName));
  }

  componentDidUpdate() {
    const { post } = this.props;
    if (!!post) {
      getUrl(`http://${document.domain}:8082${post.url}`).then(html => {
        this.contentEl.innerHTML = html;
        let scriptElem = document.createElement('script');
        scriptElem.src = `http://${document.domain}:8082${post.script}`;
        // scriptElem.onload = function () {
        //   console.log('halo');
        // };
        this.contentEl.appendChild(scriptElem);
      });
    }
  }

  render() {
    const { match, post } = this.props;
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
            <div className="category box">
              <i></i>
              <span>{post.categoryName}</span>
            </div>
            <div className="like box">
              <i></i>
              <span>{post.like}</span>
            </div>
          </div>
        }
        <div ref={content => this.contentEl = content} className="article-content"></div>
        {
          post && <div className="box-wrapper">
            <div className="category box">
              <i></i>
              <span>{post.categoryName}</span>
            </div>
            <div className="like box">
              <i></i>
              <span>{post.like}</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    post: state.post
  }),
  (dispatch) => ({
    fetch: dispatch
  })
)(PostComponent));