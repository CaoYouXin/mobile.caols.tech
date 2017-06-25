import { get, post } from './base';

const like = (postId) => {
  return get(`http://${document.domain}:8080/blog_api/feedback/like?postId=${postId}`);
}

const listComments = (postId) => {
  return get(`http://${document.domain}:8080/blog_api/feedback/comment/list?postId=${postId}`);
}

const commentPost = (postId, userName, content) => {
  return post(`http://${document.domain}:8080/blog_api/feedback/comment/post`, {
    idWhatEver: postId,
    userName,
    content,
  });
}

const commentComment = (postId, commentId, userName, atUserName, content) => {
  return post(`http://${document.domain}:8080/blog_api/feedback/comment/comment?postId=${postId}`, {
    idWhatEver: commentId,
    userName,
    atUserName,
    content,
  });
}

export { like, listComments, commentPost, commentComment };