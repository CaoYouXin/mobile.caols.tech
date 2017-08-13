const toLocalStorage = (obj) => {
  try {
    window.localStorage.setItem('obj', JSON.stringify(obj));
  } catch (e) { }
}

const fromLocalStorage = () => {
  try {
    const serialized = window.localStorage.getItem('obj');
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
}

const clearButToken = () => {
  let obj = JSON.parse(localStorage.getItem('obj') || '{}');
  localStorage.clear();
  localStorage.setItem('obj', {
    user: obj.user
  });
}

const getToken = () => {
  let obj = JSON.parse(localStorage.getItem('obj') || '{}');
  return (obj.user || { UserToken: null }).UserToken;
}

export {
  toLocalStorage,
  fromLocalStorage,
  clearButToken,
  getToken
};