const leftSideActive = (state = false, action) => {
  switch (action.type) {
    case 'left_side':
      return action.active;
    default:
      return state;
  }
}

export default leftSideActive;