const mode = (state = 'unlogined', action) => {
  switch (action.type) {
    case "Change_Left_Mode":
      return action.mode;
    case 'User_Login_Success':
      return 'logined';
    case 'User_Logout':
      return 'unlogined'
    default:
      return state;
  }
}

export default mode;