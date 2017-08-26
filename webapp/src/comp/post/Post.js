import React, { Component } from "react";
import "./Post.css";
import likePNG from './like.png';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  setBrief, getPostById, getCategories, getPrevPost, getNextPost,
  like, listComments, makeComment, setLeftSide, setLeftSideMode
} from '../../action';
import { IframeContent } from '../content/IframeContent';
import { getBreadcrumb } from '../../store/categories';

class PostComponent extends Component {
  constructor(props) {
    super(props);

    const { userName } = this.props;

    this.state = {
      replyFocused: false,
      replayUser: [userName],
      commentId: null,
      commenteeId: null,
      breadcrumb: []
    };

    this.like = this.like.bind(this);
    this.replyFocused = this.replyFocused.bind(this);
    this.replyBlur = this.replyBlur.bind(this);
    this.replySubmit = this.replySubmit.bind(this);
    this.commentComment = this.commentComment.bind(this);
    this.resetReplyUser = this.resetReplyUser.bind(this);
  }

  componentDidMount() {
    const { match, fetch, categories } = this.props;
    fetch(setBrief(true));
    fetch(getPostById(match.params.postId));
    this.justMount = true;

    if (!categories || !categories.length) {
      fetch(getCategories());
    }
  }

  componentDidUpdate(prevProps) {
    const { post: prevPost, match: prevMatch, userName: prevUserName } = prevProps;
    const { post, match, fetch, userName, categories } = this.props;
    const { breadcrumb } = this.state;

    if (prevMatch.params.postId !== match.params.postId) {
      fetch(getPostById(match.params.postId));
    }

    if (prevUserName !== userName) {
      this.setState({
        replayUser: [userName]
      });
    }

    if (!!post && (!prevPost || prevPost.BlogPostUpdateTime !== post.BlogPostUpdateTime || this.justMount)) {
      this.justMount = false;
      fetch(getPrevPost(post.BlogPostUpdateTime));
      fetch(getNextPost(post.BlogPostUpdateTime));
      fetch(listComments(post.BlogPostId));
    }

    if (!breadcrumb.length && !!categories && !!post) {
      this.setState({
        breadcrumb: getBreadcrumb([], categories, post.BlogCategoryId)
      });
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

    const { post, prev, next, comments } = this.props;
    const { breadcrumb } = this.state;
    return (
      <div className="App-post">
        {post && <h1>{post.BlogPostName}</h1>}
        <p className="breadcrumb">
          <span>/ <Link to="/">&nbsp;首页&nbsp;</Link> </span>
          {
            breadcrumb && breadcrumb.map(bc => <span key={bc.BlogCategoryId}>/ <Link to={`/category/${bc.BlogCategoryId}`}>&nbsp;{bc.BlogCategoryName}&nbsp;</Link> </span>)
          }
        </p>
        {
          post && <div className="App-btns two in-middle">
            <div className="App-btn">{post.BlogPostCreateTime} 创建</div>
            <div className="App-btn">{post.BlogPostUpdateTime} 更新</div>
          </div>
        }
        {
          post && <IframeContent url={post.BlogPostUrl}></IframeContent>
        }
        <div className="App-btns two in-middle">
          <div className="App-btn">上一篇: {
            !prev ? '没有上一篇了' : <Link to={`/post/${prev.BlogPostId}`}>{prev.BlogPostName}</Link>
          }</div>
          <div className="App-btn">下一篇: {
            !next ? '没有下一篇了' : <Link to={`/post/${next.BlogPostId}`}>{next.BlogPostName}</Link>
          }</div>
        </div>
        <div className="like">
          <img src={likePNG} alt="点赞" onClick={this.like} />
          <hr />
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
            <li key={commentGroup.CommentId}>
              <div><a href="" onClick={(e) => { this.commentComment(e, commentGroup.WriterName, commentGroup.CommentId, commentGroup.WriterUserId) }}>{commentGroup.WriterName}</a>
                : {commentGroup.CommentContent} @{commentGroup.CommentTime}</div>
              <ul className="comments-of-comment">
                {
                  commentGroup.Leafs && commentGroup.Leafs.map(comment => (
                    <li key={comment.CommentId}><a href="" onClick={(e) => { this.commentComment(e, comment.WriterName, commentGroup.CommentId, comment.WriterUserId) }}>{comment.WriterName}</a>
                      @ {comment.CommenteeName} : {comment.CommentContent} @{comment.CommentTime}</li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  like(e) {
    const { post, processLike, goToLogin, userId } = this.props;

    if (!userId) {
      goToLogin();
      return;
    }

    processLike(post.BlogPostId);
  }

  resetReplyUser(e) {
    if (!!e) {
      e.preventDefault();
    }
    const { userName } = this.props;
    this.setState({
      replayUser: [userName],
      commentId: null,
      commenteeId: null
    });
  }

  commentComment(e, commenteeName, commentId, commenteeId) {
    e.preventDefault();
    this.setState({
      replayUser: [this.state.replayUser[0], commenteeName],
      commentId,
      commenteeId
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
    const { comment, post, goToLogin, userId } = this.props;
    const { replayUser, commentId, commenteeId } = this.state;

    if (!userId) {
      goToLogin();
      return;
    }

    comment(post.BlogPostId, userId, replayUser[0], this.textareaEl.value, commenteeId, replayUser[1], commentId);
    this.textareaEl.value = '';
    this.resetReplyUser();
  }

}

export default withRouter(connect(
  (state) => ({
    categories: state.categories,
    userId: state.user.UserId,
    userName: state.user.UserName,
    post: state.post.post,
    prev: state.post.prev,
    next: state.post.next,
    comments: state.post.comments
  }),
  (dispatch, ownProps) => ({
    fetch: dispatch,
    processLike: (postId) => {
      dispatch(like(postId));
    },
    comment: (postId, writerId, writerName, content, commenteeId, commenteeName, commentId) => {
      dispatch(makeComment(postId, writerId, writerName, content, commenteeId, commenteeName, commentId));
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