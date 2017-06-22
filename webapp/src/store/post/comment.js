const comments = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Comment_Success':
      return [...action.response];
    case 'Reset_Comments':
      return [];
    default:
      return state;
  }
}

export default comments;