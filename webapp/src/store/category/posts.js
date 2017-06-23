const posts = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Post_by_Category_Success':
      return [...action.response];
    default:
      return state;
  }
}

export default posts;