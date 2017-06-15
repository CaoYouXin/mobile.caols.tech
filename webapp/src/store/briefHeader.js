const briefHeader = (state = false, action) => {
  switch (action.type) {
    case 'brief_header':
      return action.brief;
    default:
      return state;
  }
}

export default briefHeader;