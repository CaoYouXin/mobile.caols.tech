const post = (state = [], action) => {
    switch (action.type) {
        case 'Fetch_Post_Success':
            return [...action.response];
        default:
            return state;
    }
};

export default post;