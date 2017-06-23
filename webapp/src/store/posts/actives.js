const actives = (state = [], action) => {
  switch (action.type) {
    case 'more':
      return [...state, true];
    case 'Fetch_Post_Success':
      return [];
    case 'Post_Pager_Go':
      return [];
    default:
      return state;
  }
}

export default actives;