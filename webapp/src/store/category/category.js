const category = (state = null, action) => {
  switch (action.type) {
    case 'Fetch_Category_by_Name_Success':
      return action.response;
    default:
      return state;
  }
}

export default category;