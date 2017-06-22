import { login } from '../api';

const loginAction = (username, password) => (dispatch) => {
  login(username, password).then(response => {
    dispatch({
      type: 'User_Login_Success',
      response
    });
  });
}

export { loginAction };