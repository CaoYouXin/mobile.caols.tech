import { getAPI, get } from '../http';

const getPrevPost = (update) => (dispatch) => {
  get(getAPI("PreviousPost")(update)).then(response => {
    dispatch({
      type: 'Fetch_Prev_Post_Success',
      response
    })
  }, error => {
    alert(error);
  });
}

const getNextPost = (update) => (dispatch) => {
  get(getAPI("NextPost")(update)).then(response => {
    dispatch({
      type: 'Fetch_Next_Post_Success',
      response
    })
  }, error => {
    alert(error);
  });
}

export { getPrevPost, getNextPost };