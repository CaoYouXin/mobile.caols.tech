import { post } from './base';
import md5 from 'md5';

const login = (username, password) => {
  return post(`http://${document.domain}:8080/user_api/user/login`, {
    userName: username,
    password: md5(password)
  }, (ret) => {
    if (ret.code === 50200) {
      return Promise.reject("未注册！");
    } else if (ret.code === 50201) {
      return Promise.reject("密码错误！");
    } else if (ret.code !== 20000) {
      return Promise.reject(ret.body);
    } else {
      return Promise.resolve(ret.body);
    }
  });
}

export { login };