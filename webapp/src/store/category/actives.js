const actives = (state = [], action) => {
  switch (action.type) {
    case 'Post_by_CategoryName_more':
      return [...state, true];
    case 'Fetch_Post_by_Category_Success':
      return [];
    case 'Post_by_CategoryName_Pager_Go':
      return [];
    default:
      return state;
  }
}

export default actives;