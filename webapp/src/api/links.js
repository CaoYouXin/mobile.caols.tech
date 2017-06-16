import { get, post } from './base';

const getTop5 = () => {
  return get(`http://${document.domain}:8080/blog_api/post/list_top_5`);
};

const prevPost = (update) => {
  return post(`http://${document.domain}:8080/blog_api/post/previous`, {
    date: update
  })
}

const nextPost = (update) => {
  return post(`http://${document.domain}:8080/blog_api/post/next`, {
    date: update
  })
}

export { getTop5, prevPost, nextPost };