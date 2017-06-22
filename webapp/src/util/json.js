const toLocalStorage = (obj) => {
  try {
    window.localStorage.setItem('obj', JSON.stringify(obj));
  } catch (e) {
  }
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

export { toLocalStorage, fromLocalStorage };