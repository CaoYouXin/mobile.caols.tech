const liked = (state = null, action) => {
  switch (action.type) {
    case 'Fetch_Post_Liked_Success':
      return action.response;
    default:
      return state;
  }
}

export { liked };