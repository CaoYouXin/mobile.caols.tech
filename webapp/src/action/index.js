import { getCategories, getPosts, getPostsByCategoryName, 
  getPostByName as fetchPostByName, getCategoryByName as fetchCategoryByName } from '../api';

const getCategory = () => (dispatch) => {
  getCategories().then(response => {
    dispatch({
      type: 'Fetch_Category_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

const getPost = (cb) => (dispatch) => {
  getPosts().then(response => {
    dispatch({
      type: 'Fetch_Post_Success',
      response
    });
    cb();
  }, error => {
    alert(error);
  });
}

const getPostByCategoryName = (categoryName, cb) => (dispatch) => {
  getPostsByCategoryName(categoryName).then(response => {
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

const getPostByName = (postName) => (dispatch) => {
  fetchPostByName(postName).then(response => {
    dispatch({
      type: 'Fetch_Post_by_Name_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

const getCategoryByName = (categoryName) => (dispatch) => {
  fetchCategoryByName(categoryName).then(response => {
    dispatch({
      type: 'Fetch_Category_by_Name_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

export { getCategory, getPost, getPostByCategoryName, getPostByName, getCategoryByName };
export * from './links';
export * from './feedback';
export * from './flags';
export * from './user';
