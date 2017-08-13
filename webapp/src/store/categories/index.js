import list from './list';

export const getBreadcrumb = (now, cs, idx, id) => {
  if (idx >= cs.length) {
    return now;
  }

  let c = cs[idx];
  now = [...now, c];

  if (c.BlogCategoryId + '' === id + '') {
    return now;
  }

  let cc = cs[idx].ChildCategories || [];
  if (!cc.length) {
    now.pop();
    return now;
  }

  let cIdx = 0,
    newNow = [];
  while (cIdx < cc.length) {
    newNow = getBreadcrumb(now, cc, cIdx++, id);
    if (newNow.length > now.length) {
      break;
    }
  }

  if (newNow.length > now.length) {
    return newNow;
  } else {
    now.pop();
    return now;
  }
};

export default list;