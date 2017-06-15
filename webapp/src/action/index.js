import { getCategories, getPosts } from '../api';

const getCategory = (dispatch) => {
    getCategories().then(response => {
        dispatch({
            type: 'Fetch_Category_Success',
            response
        });
    });
}

const getPost = (dispatch) => {
    getPosts().then(response => {
        dispatch({
            type: 'Fetch_Post_Success',
            response
        });
    });
}

const get = (type) => (dispatch) => {
    let func = null;
    switch (type) {
        case 'Category':
            func = getCategory;
            break;
        case 'Post':
            func = getPost;
            break;
        default:
            throw new Error(`unknown type ${type}`);
    }
    func(dispatch);
}

export { get };