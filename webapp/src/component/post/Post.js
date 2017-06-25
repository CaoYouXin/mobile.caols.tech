import React, { Component } from "react";
import "./Post.css";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  setBrief, getPostByName, getTop5, getPrevPost, getNextPost, getPostByCategoryName,
  like, listComments, makeComment2Post, setLeftSide, setLeftSideMode, makeComment2Comment
} from '../../action';
import { getUrl } from '../../api';

class PostComponent extends Component {
  constructor(props) {
    super(props);

    const { userName } = this.props;

    this.state = {
      replyFocused: false,
      replayUser: [userName],
      commentId: null
    };

    this.replyFocused = this.replyFocused.bind(this);
    this.replyBlur = this.replyBlur.bind(this);
    this.replySubmit = this.replySubmit.bind(this);
    this.commentComment = this.commentComment.bind(this);
    this.resetReplyUser = this.resetReplyUser.bind(this);
  }

  resetReplyUser(e) {
    if (!!e) {
      e.preventDefault();
    }
    const { userName } = this.props;
    this.setState({
      replayUser: [userName],
      commentId: null
    });
  }

  commentComment(e, atUserName, commentId) {
    e.preventDefault();
    this.setState({
      replayUser: [this.state.replayUser[0], atUserName],
      commentId
    });
    this.textareaEl.focus();
  }

  replyFocused() {
    window.location.hash = 'reply';
    this.setState({ replyFocused: true });
  }

  replyBlur() {
    this.setState({ replyFocused: false });
  }

  replySubmit() {
    const { comment, post, goToLogin } = this.props;
    const { replayUser, commentId } = this.state;

    if (!replayUser[0]) {
      goToLogin();
      return;
    }

    comment(post.id, replayUser[0], this.textareaEl.value, replayUser[1], commentId);
    this.textareaEl.value = '';
    this.resetReplyUser();
  }

  componentDidMount() {
    const { match, fetch } = this.props;
    fetch(setBrief(true));
    fetch(getPostByName(match.params.postName));
    fetch(getTop5());
    this.justMount = true;
  }

  componentDidUpdate(prevProps) {
    const { post: prevPost, match: prevMatch, userName: prevUserName } = prevProps;
    const { post, match, fetch, userName } = this.props;
    if (prevMatch.params.postName !== match.params.postName) {
      fetch(getPostByName(match.params.postName));
    }

    if (prevUserName !== userName) {
      this.setState({
        replayUser: [userName]
      });
    }

    if (!!post && (!prevPost || prevPost.url !== post.url || this.justMount)) {
      this.justMount = false;
      document.body.scrollTop = 0;
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

    const { resetComments } = this.props;
    resetComments();
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
            <div className="category box" onClick={() => goCategory(post.categoryName, () => { history.push(`/category/${post.categoryName}`) })}>
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
            <div className="category box" onClick={() => goCategory(post.categoryName, () => { history.push(`/category/${post.categoryName}`) })}>
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
              !prev.id ? prev.name :
                <Link to={`/post/${prev.name}`}>{prev.name}</Link>
            }</div>
            <div className="App-btn">下一篇: {
              !next.id ? next.name :
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
          <div className="title"><span onClick={this.resetReplyUser}>{this.state.replayUser.join(' @ ')}</span>发布评论...</div>
          <textarea ref={textarea => this.textareaEl = textarea} placeholder="输入评论..."
            onFocus={this.replyFocused} onBlur={this.replyBlur}
            className={replyClassName}></textarea>
          <div className="publish-btn" onClick={this.replySubmit}>发布</div>
        </div>
        <ol className="comments" reversed="reversed">
          {comments.map(commentGroup => (
            <li key={commentGroup.id}>
              <div><a href="" onClick={(e) => { this.commentComment(e, commentGroup.userName, commentGroup.id) }}>{commentGroup.userName}</a>
                : {commentGroup.content} @{commentGroup.create}</div>
              <ul className="comments-of-comment">
                {
                  commentGroup.follows && commentGroup.follows.map(comment => (
                    <li key={comment.id}><a href="" onClick={(e) => { this.commentComment(e, comment.userName, commentGroup.id) }}>{comment.userName}</a>
                      @ {comment.atUserName} : {comment.content} @{comment.create}</li>
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
    userName: state.user.userName,
    post: state.post.post,
    prev: state.post.prev,
    next: state.post.next,
    top5: state.post.top5,
    comments: state.post.comments
  }),
  (dispatch, ownProps) => ({
    fetch: dispatch,
    goCategory: (categoryName, history) => {
      dispatch(getPostByCategoryName(categoryName, history));
    },
    processLike: (postId) => {
      dispatch(like(postId));
    },
    comment: (postId, userName, content, atUserName, commentId) => {
      if (!atUserName) {
        dispatch(makeComment2Post(postId, userName, content));
      } else {
        dispatch(makeComment2Comment(postId, commentId, userName, atUserName, content));
      }
    },
    resetComments: () => {
      dispatch({
        type: 'Reset_Comments'
      })
    },
    goToLogin: () => {
      dispatch(setLeftSideMode('login'));
      dispatch(setLeftSide(true));
    }
  })
)(PostComponent));