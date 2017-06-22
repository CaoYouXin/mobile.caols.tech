const prev = (state = null, action) => {
  switch (action.type) {
    case 'Fetch_Prev_Post_Success':
      return action.response;
    default:
      return state;
  }
}

const next = (state = null, action) => {
  switch (action.type) {
    case 'Fetch_Next_Post_Success':
      return action.response;
    default:
      return state;
  }
}

const top5 = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Top5_Post_Success':
      return [...action.response];
    default:
      return state;
  }
}

export { prev, next, top5 };
