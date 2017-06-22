import { post } from './base';
import md5 from 'md5';

const login = (username, password) => {
  return post(`http://${document.domain}:8080/user_api/user/login`, {
    userName: username,
    password: md5(password)
  });
}

export { login };