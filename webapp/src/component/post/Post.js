import React, { Component } from "react";
import "./Post.css";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setBrief, getPostByName, getTop5, getPrevPost, getNextPost, getPostByCategoryName, like, listComments } from '../../action';
import { getUrl } from '../../api';

class PostComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replyFocused: false,
      replayUser: ''
    };

    this.replyFocused = this.replyFocused.bind(this);
    this.replyBlur = this.replyBlur.bind(this);
    this.replySubmit = this.replySubmit.bind(this);
  }

  replyFocused() {
    window.location.hash = 'reply';
    this.setState({replyFocused: true});
  }

  replyBlur() {
    this.setState({replyFocused: false});
  }

  replySubmit() {
    // const {comment, post} = this.props;
    // comment(post.id, )
    this.textareaEl.value = '';
  }

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
      fetch(listComments(post.id));
    }
  }

  componentWillUnmount() {
    this.justMount = false;
  }

  render() {
    let replyClassName = 'reply';
    if (this.state.replyFocused) {
      replyClassName += ' focused';
    }

    const { match, post, prev, next, top5, goCategory, processLike, comments, history } = this.props;
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
            <div className="category box" onClick={() => goCategory(post.categoryName, history)}>
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
            <div className="category box" onClick={() => goCategory(post.categoryName, history)}>
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
        <div id="reply" className={replyClassName}>
          <div className="title"><span>{this.state.replayUser}</span>发布评论...</div>
          <textarea ref={textarea => this.textareaEl = textarea} placeholder="输入评论..."
            onFocus={this.replyFocused} onBlur={this.replyBlur} 
            className={replyClassName}></textarea>
          <div className="publish-btn" onClick={this.replySubmit}>发布</div>
        </div>
        <ol className="comments" reversed="reversed">
          {comments.map(commentGroup => (
            <li key={commentGroup.id}>
              <div>{commentGroup.userName} : {commentGroup.content} @{commentGroup.create}</div>
              <ul className="comments-of-comment">
                {
                  commentGroup.follows && commentGroup.follows.map(comment => (
                    <li key={comment.id}>{comment.userName} @ {comment.atUserName} : {comment.content} @{comment.create}</li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    post: state.post,
    prev: state.prev,
    next: state.next,
    top5: state.top5,
    comments: state.comments
  }),
  (dispatch, ownProps) => ({
    fetch: dispatch,
    goCategory: (categoryName, history) => {
      dispatch(getPostByCategoryName(categoryName, history));
    },
    processLike: (postId) => {
      dispatch(like(postId));
    },
    comment: (postId, userName, atUserName, content) => {

    }
  })
)(PostComponent));