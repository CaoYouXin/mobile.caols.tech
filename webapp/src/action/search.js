import { search } from '../api';

const makeSearch = (analysisResult) => (dispatch) => {
  search(analysisResult).then(response => {
    switch (response.type) {
      case 'category':
        dispatch({
          type: 'Search_Category_Success',
          response: response.response
        });
        break;
      case 'post':
        dispatch({
          type: 'Search_Post_Success',
          response: response.response
        });
        break;
      default:
        throw new Error(`unknown type ${response.type}`);
    }
  }).catch(error => {
    alert(error);
  });
}

export { makeSearch };