import { like as processLike, listComments as fetchComments } from '../api';

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

export { like, listComments };