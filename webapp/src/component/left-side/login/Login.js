import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';

class LoginComponent extends Component {
  render() {
    const { login, goBack, goRegister } = this.props;
    return (
      <div className="login-root">
        <form>
          <fieldset>
            <legend>用户名</legend>
            <input type="text" placeholder="输入用户名" tabIndex="1" />
          </fieldset>
          <fieldset>
            <legend>密码</legend>
            <input type="password" placeholder="输入密码" tabIndex="2" />
          </fieldset>
          <fieldset>
            <span onClick={(e) => goRegister()}>注册</span>
          </fieldset>
          <fieldset>
            <input type="button" value="登录" onClick={(e) => login()} />
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
    login: () => {
      dispatch({
        type: 'Change_Left_Mode',
        mode: 'logined'
      });
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
