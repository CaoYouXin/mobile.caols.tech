import { getAPI, post } from '../http';
import md5 from 'md5';

const login = (username, password) => (dispatch) => {
  post(getAPI("login"), {
    UserName: username,
    UserPassword: md5(password)
  }).then(response => {
    dispatch({
      type: 'User_Login_Success',
      response
    });
  }, error => {
    alert(error);
  });
}

export { login };