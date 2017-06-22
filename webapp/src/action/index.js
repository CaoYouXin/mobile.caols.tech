import { getCategories, getPosts, getPostsByCategoryName, getPostByName as fetchPostByName } from '../api';

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

const getPostByCategoryName = (categoryName, history) => (dispatch) => {
  getPostsByCategoryName(categoryName).then(response => {
    dispatch({
      type: 'Fetch_Post_by_Category_Success',
      response
    });
    history.push('/');
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



export { getCategory, getPost, getPostByCategoryName, getPostByName };
export * from './links';
export * from './feedback';
export * from './flags';
export * from './user';
