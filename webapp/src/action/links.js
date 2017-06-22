import { getTop5 as fetchTop5, prevPost, nextPost } from '../api';

const getTop5 = () => (dispatch) => {
  fetchTop5().then(response => {
    dispatch({
      type: 'Fetch_Top5_Post_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

const getPrevPost = (update) => (dispatch) => {
  prevPost(update).then(response => {
    dispatch({
      type: 'Fetch_Prev_Post_Success',
      response
    })
  }, error => {
    alert(error);
  });
}

const getNextPost = (update) => (dispatch) => {
  nextPost(update).then(response => {
    dispatch({
      type: 'Fetch_Next_Post_Success',
      response
    })
  }, error => {
    alert(error);
  });
}

export { getTop5, getPrevPost, getNextPost };