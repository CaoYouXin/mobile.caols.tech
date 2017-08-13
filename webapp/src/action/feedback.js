import { getAPI, get, post } from '../http';

const like = (postId) => (dispatch) => {
  get(getAPI("like")(postId)).then(response => {
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
  get(getAPI("FetchComments")(postId)).then(response => {
    dispatch({
      type: 'Fetch_Comment_Success',
      response
    })
  }, error => {
    alert(error);
  });
}

const makeComment = (postId, writerId, writerName, content, commenteeId, commenteeName, commentId) => (dispatch) => {
  post(getAPI("Comment"), {
    BlogPostId: postId,
    WriterUserId: writerId,
    CommentContent: content,
    ParentCommentId: commentId,
    CommenteeUserId: commenteeId
  }).then(response => {
    response.WriterName = writerName;
    response.CommenteeName = commenteeName;
    if (!commentId) {
      dispatch({
        type: 'Comment_Post_Success',
        response
      });
    } else {
      dispatch({
        type: 'Comment_Comment_Success',
        response
      });
    }
  }, error => {
    alert(error);
  });
}

export { like, listComments, makeComment };