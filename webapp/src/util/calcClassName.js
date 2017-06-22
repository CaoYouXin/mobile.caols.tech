const calc = (obj) => {
  return Object.keys(obj).filter(key => obj[key]).join(' ');
}

export default calc;