const type = (state = null, action) => {
  switch (action.type) {
    case 'Search_Post_Success':
      return 'post';
    case 'Search_Category_Success':
      return 'category';
    default:
      return state;
  }
}

export default type;