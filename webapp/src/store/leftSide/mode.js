const mode = (state = 'unlogined', action) => {
  switch (action.type) {
    case "Change_Left_Mode":
      return action.mode;
    default:
      return state;
  }
}

export default mode;