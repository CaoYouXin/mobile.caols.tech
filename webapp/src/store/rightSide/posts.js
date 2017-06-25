const posts = (state = [], action) => {
  switch (action.type) {
    case 'Search_Post_Success':
      return [...action.response];
    default:
      return state;
  }
}

export default posts;