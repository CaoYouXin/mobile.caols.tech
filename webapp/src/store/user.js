const user = (state = {}, action) => {
  switch (action.type) {
    case 'User_Login_Success':
      return action.response;
    case 'User_Logout':
      return {};
    default:
      return state;
  }
}

export default user;