const comments = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Comment_Success':
      return [...action.response];
    case 'Reset_Comments':
      return [];
    case 'Comment_Post_Success':
      return [action.response, ...state];
    case 'Comment_Comment_Success':
      const idx = state.findIndex((elem) => elem.id === action.response.id);
      return [
        ...state.slice(0, idx),
        action.response,
        ...state.slice(idx + 1)
      ]
    default:
      return state;
  }
}

export default comments;