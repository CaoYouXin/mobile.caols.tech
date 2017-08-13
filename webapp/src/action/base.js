import {
  getAPI,
  get
} from '../http';

const getCategories = (cb) => (dispatch) => {
  get(getAPI("categories")).then(response => {
    dispatch({
      type: 'Fetch_Category_Success',
      response
    });
    if (!!cb) cb();
  }, error => {
    alert(error);
  });
}

const getPosts = (cb) => (dispatch) => {
  get(getAPI("all/posts")).then(response => {
    dispatch({
      type: 'Fetch_Post_Success',
      response
    });
    if (!!cb) cb();
  }, error => {
    alert(error);
  });
}

const getPostsByCategoryId = (categoryId, cb) => (dispatch) => {
  get(getAPI("posts")(categoryId)).then(response => {
    dispatch({
      type: 'Fetch_Post_by_Category_Success',
      response
    });
    if (!!cb) {
      cb();
    }
  }, error => {
    alert(error);
  });
}

const getPostById = (postId) => (dispatch) => {
  get(getAPI("post")(postId)).then(response => {
    dispatch({
      type: 'Fetch_Post_by_Name_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

export {
  getCategories,
  getPosts,
  getPostsByCategoryId,
  getPostById
};