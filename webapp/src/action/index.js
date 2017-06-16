import { getCategories, getPosts, getPostsByCategoryName, getPostByName as fetchPostByName } from '../api';

const getCategory = () => (dispatch) => {
  getCategories().then(response => {
    dispatch({
      type: 'Fetch_Category_Success',
      response
    });
  });
}

const getPost = () => (dispatch) => {
  getPosts().then(response => {
    dispatch({
      type: 'Fetch_Post_Success',
      response
    });
  });
}

const getPostByCategoryName = (categoryName) => (dispatch) => {
  getPostsByCategoryName(categoryName).then(response => {
    dispatch({
      type: 'Fetch_Post_by_Category_Success',
      response
    })
  })
}

const getPostByName = (postName) => (dispatch) => {
  fetchPostByName(postName).then(response => {
    dispatch({
      type: 'Fetch_Post_by_Name_Success',
      response
    });
  });
}

const setBrief = (brief) => ({
  type: 'brief_header',
  brief
});

export { getCategory, getPost, getPostByCategoryName, getPostByName, setBrief };