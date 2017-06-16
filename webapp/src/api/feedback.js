import { get } from './base';

const like = (postId) => {
  return get(`http://${document.domain}:8080/blog_api/feedback/like?postId=${postId}`);
}

const listComments = (postId) => {
  return get(`http://${document.domain}:8080/blog_api/feedback/comment/list?postId=${postId}`);
}

export { like, listComments };