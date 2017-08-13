import React, { Component } from 'react';
import './Register.css';
import { connect } from 'react-redux';
import { getAPI } from '../../../http';
import { register } from '../../../action';
import md5 from 'md5';

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: md5(new Date().toISOString())
    };
  }

  refreshToken() {
    this.setState({
      token: md5(new Date().toISOString())
    });
  }

  render() {
    const { goBack } = this.props;
    const { token } = this.state;
    return (
      <div className="register-root">
        <form>
          <fieldset>
            <legend>用户名</legend>
            <input ref={(username) => { this.usernameEl = username }} type="text" placeholder="输入用户名" tabIndex="1" />
          </fieldset>
          <fieldset>
            <legend>密码</legend>
            <input ref={(password) => { this.passwordEl = password }} type="password" placeholder="输入密码" tabIndex="2" />
          </fieldset>
          <fieldset>
            <legend>确认密码</legend>
            <input ref={(passwordConfirmed) => { this.passwordConfirmedEl = passwordConfirmed }} type="password" placeholder="输入确认密码" tabIndex="3" />
          </fieldset>
          <fieldset>
            <legend>验证码</legend>
            <input ref={(imageCaptcha) => { this.imageCaptchaEl = imageCaptcha }} className="short" type="text" placeholder="输入验证码" tabIndex="4" />
            <span className="short-info" style={{
              backgroundImage: getAPI("CaptchaImage")(200, 50, token),
              backgroundSize: 'cover'
            }} onClick={(e) => this.refreshToken()}></span>
          </fieldset>
          <fieldset>
            <input type="button" value="注册" onClick={(e) => this.toRegister(this.usernameEl.value, this.passwordEl.value, this.passwordConfirmedEl.value, this.imageCaptchaEl.value, token)} />
            <input type="button" value="返回" onClick={(e) => goBack()} />
          </fieldset>
        </form>
      </div>
    );
  }

  toRegister(username, password, passwordConfirmed, imageCaptcha, captchaToken) {
    if (password !== passwordConfirmed) {
      alert('两次输入的密码不一致!');
      return;
    }

    username = username || '';
    if (username.length < 6 || username.length > 24) {
      alert('用户名长度不合法!');
      return;
    }

    password = password || '';
    if (password.length < 6 || password.length > 24) {
      alert('密码长度不合法!');
      return;
    }

    const { register } = this.props;
    register(username, password, imageCaptcha, captchaToken);
  }

}

export default connect(
  null,
  (dispatch) => ({
    register: (username, password, imageCaptcha, captchaToken) => {
      dispatch(register(username, password, imageCaptcha, captchaToken));
    },
    goBack: () => {
      dispatch({
        type: 'Change_Left_Mode',
        mode: 'unlogined'
      });
    }
  })
)(RegisterComponent);