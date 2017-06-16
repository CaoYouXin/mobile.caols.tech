const list = (state = 'Category', action) => {
  switch (action.type) {
    case 'Fetch_Category_Success':
      return 'Category';
    case 'Fetch_Post_Success':
      return 'Post';
    default:
      return state;
  }
}

const data = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Category_Success':
    case 'Fetch_Post_Success':
      return [...action.response];
    default:
      return state;
  }
};

export { list, data };