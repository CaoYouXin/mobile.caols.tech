const post = (state = null, action) => {
  switch (action.type) {
    case 'Fetch_Post_by_Name_Success':
      return action.response;
    case 'Process_Like_Success':
      if (state.id === action.postId) {
        return {
          ...state,
          like: action.response
        };
      }
      return state;
    default:
      return state;
  }
}

export default post;