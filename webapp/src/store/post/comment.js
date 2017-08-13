const comments = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Comment_Success':
      return [...action.response];
    case 'Reset_Comments':
      return [];
    case 'Comment_Post_Success':
      return [action.response, ...state];
    case 'Comment_Comment_Success':
      const idx = state.findIndex((elem) => elem.CommentId === action.response.ParentCommentId);
      state[idx].Leafs = state[idx].Leafs || [];
      state[idx].Leafs = [action.response, ...state[idx].Leafs];
      return [...state];
    default:
      return state;
  }
}

export default comments;