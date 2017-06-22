import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { loginAction } from '../../../action';

class LoginComponent extends Component {
  render() {
    const { login, goBack, goRegister } = this.props;
    return (
      <div className="login-root">
        <form>
          <fieldset>
            <legend>用户名</legend>
            <input ref={(username) => {this.usernameEl = username}} type="text" placeholder="输入用户名" tabIndex="1" />
          </fieldset>
          <fieldset>
            <legend>密码</legend>
            <input ref={(password) => {this.passwordEl = password}} type="password" placeholder="输入密码" tabIndex="2" />
          </fieldset>
          <fieldset>
            <span onClick={(e) => goRegister()}>注册</span>
          </fieldset>
          <fieldset>
            <input type="button" value="登录" onClick={(e) => login(this.usernameEl.value, this.passwordEl.value)} />
            <input type="button" value="返回" onClick={(e) => goBack()} />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    login: (username, password) => {
      dispatch(loginAction(username, password));
    },
    goBack: () => {
      dispatch({
        type: 'Change_Left_Mode',
        mode: 'unlogined'
      });
    },
    goRegister: () => {
      dispatch({
        type: 'Change_Left_Mode',
        mode: 'register'
      });
    }
  })
)(LoginComponent);
