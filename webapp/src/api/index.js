const logError = (ret) => {
  if (ret.code !== 20000) {
    alert(ret.body);
    return;
  }

  return Promise.resolve(ret.body);
}

const get = (url) => {
  var myInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request(url);

  return fetch(myRequest, myInit).then(function (response) {
    return response.json().then(logError);
  });
}

const getCategories = () => {
  return get(`http://${document.domain}:8080/blog_api/category/list`);
}

const getPosts = () => {
  return get(`http://${document.domain}:8080/blog_api/post/list`);
}

const getPostsByCategoryName = (categoryName) => {
  return get(`http://${document.domain}:8080/blog_api/post/list_by_category?category=${categoryName}&platform=All,Mobile`);
}

const getUrl = (url) => {
  var myInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request(url);

  return fetch(myRequest, myInit).then(res => {
    return res.text();
  });
}

export { getCategories, getPosts, getPostsByCategoryName, getUrl };