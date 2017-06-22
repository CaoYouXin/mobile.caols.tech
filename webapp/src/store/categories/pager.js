const pager = (state = {
  page: 1,
  total: 1,
  size: 1
}, action) => {
  switch (action.type) {
    case 'go':
      return Object.assign({}, state, {
        page: Math.max(1, Math.min(state.page + action.go, state.total))
      });
    case 'Fetch_Category_Success':
      const size = 6;
      return {
        page: 1,
        total: action.response.length % size === 0 ? action.response.length / size : Math.ceil(action.response.length / size),
        size: size
      };
    default:
      return state;
  }
}

export default pager;

export const getPage = (categories, pager) => {
  return [...categories.slice((pager.page - 1) * pager.size, pager.page * pager.size)];
}