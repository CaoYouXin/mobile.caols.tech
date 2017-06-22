const actives = (state = [], action) => {
  switch (action.type) {
    case 'more':
      return [...state, true];
    case 'Fetch_Post_Success':
      return [];
    default:
      return state;
  }
}

export default actives;