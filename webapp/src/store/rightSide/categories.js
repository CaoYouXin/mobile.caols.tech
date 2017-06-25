const categories = (state = [], action) => {
  switch (action.type) {
    case 'Search_Category_Success':
      return [...action.response];
    default:
      return state;
  }
}

export default categories;