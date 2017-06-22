const data = (state = [], action) => {
  switch (action.type) {
    case 'Fetch_Category_Success':
      return [...action.response];
    default:
      return state;
  }
};

export default data;
