import { get } from './base';

const getCategories = () => {
  return get(`http://${document.domain}:8080/blog_api/category/list`);
}

const getPosts = () => {
  return get(`http://${document.domain}:8080/blog_api/post/list`);
}

const getPostsByCategoryName = (categoryName) => {
  return get(`http://${document.domain}:8080/blog_api/post/list_by_category?category=${categoryName}&platform=All,Mobile`);
}

const getPostByName = (postName) => {
  return get(`http://${document.domain}:8080/blog_api/post/fetch_by_name?name=${postName}`);
}

const getCategoryByName = (categoryName) => {
  return get(`http://${document.domain}:8080/blog_api/category/fetch_by_name?name=${categoryName}`);
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

export { getCategories, getPosts, getPostsByCategoryName, getPostByName, getCategoryByName, getUrl };
export * from './links';
export * from './feedback';
export * from './user';
