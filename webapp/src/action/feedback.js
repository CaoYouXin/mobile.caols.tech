import { like as processLike } from '../api';

const like = (postId) => (dispatch) => {
  processLike(postId).then(response => {
    dispatch({
      type: 'Process_Like_Success',
      postId,
      response
    })
  });
}

export { like };