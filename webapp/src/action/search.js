const parseCmd = (cmd) => {
  return new RegExp(cmd.replace(/\s+/g, '|'));
}

const searchCategories = (regExp, ret, array) => {
  array.forEach(c => {
    if (regExp.test(c.BlogCategoryName)) {
      ret.push(c);
    }

    if (!!c.ChildCategories && c.ChildCategories.length) {
      searchCategories(regExp, ret, c.ChildCategories);
    }
  });

  return ret;
}

export const makeSearch = (cmd, categories, posts) => (dispatch) => {
  var regExp = parseCmd(cmd);

  var c = searchCategories(regExp, [], categories);
  dispatch({
    type: 'Search_Category_Success',
    response: c
  });

  var p = posts.filter(post => {
    return regExp.test(post.BlogPostName)
      || regExp.test(post.BlogPostCreateTime)
      || regExp.test(post.BlogPostUpdateTime);
  });
  dispatch({
    type: 'Search_Post_Success',
    response: p
  });
}