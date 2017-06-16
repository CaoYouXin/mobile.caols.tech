import { getCategories, getPosts } from '../api';

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

const setBrief = (brief) => ({
  type: 'brief_header',
  brief
});

export { getCategory, getPost, setBrief };