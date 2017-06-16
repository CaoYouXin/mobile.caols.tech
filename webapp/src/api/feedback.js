import { get } from './base';

const like = (postId) => {
  return get(`http://${document.domain}:8080/blog_api/feedback/like?postId=${postId}`);
}

export { like };