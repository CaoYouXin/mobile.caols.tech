const post = (state = null, action) => {
  switch (action.type) {
    case 'Fetch_Post_by_Name_Success':
      return action.response;
    default:
      return state;
  }
}

export default post;