import { like as processLike, listComments as fetchComments, commentPost, commentComment } from '../api';

const like = (postId) => (dispatch) => {
  processLike(postId).then(response => {
    dispatch({
      type: 'Process_Like_Success',
      postId,
      response
    })
  }, error => {
    alert(error);
  });
}

const listComments = (postId) => (dispatch) => {
  fetchComments(postId).then(response => {
    dispatch({
      type: 'Fetch_Comment_Success',
      response
    })
  }, error => {
    alert(error);
  });
}

const makeComment2Post = (postId, userName, content) => (dispatch) => {
  commentPost(postId, userName, content).then(response => {
    dispatch({
      type: 'Comment_Post_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

const makeComment2Comment = (postId, commentId, userName, atUserName, content) => (dispatch) => {
  commentComment(postId, commentId, userName, atUserName, content).then(response => {
    dispatch({
      type: 'Comment_Comment_Success',
      response
    }, error => {
      alert(error);
    });
  })
}

export { like, listComments, makeComment2Post, makeComment2Comment };