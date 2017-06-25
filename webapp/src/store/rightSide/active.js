const rightSideActive = (state = false, action) => {
  switch (action.type) {
    case 'right_side':
      return action.active;
    case 'Search_Category_Success':
    case 'Search_Post_Success':
      return true;
    default:
      return state;
  }
}

export default rightSideActive;