import React, { Component } from 'react';
import './Register.css';
import { connect } from 'react-redux';
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
    const { register, goBack } = this.props;
    const { token } = this.state;
    return (
      <div className="register-root">
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
            <legend>确认密码</legend>
            <input type="password" placeholder="输入确认密码" tabIndex="3" />
          </fieldset>
          <fieldset>
            <legend>验证码</legend>
            <input className="short" type="text" placeholder="输入验证码" tabIndex="4" />
            <span className="short-info" style={{
              backgroundImage: `url(http://${document.domain}:8080/user_api/captcha/image?token=${token})`,
              backgroundSize: 'cover'
            }} onClick={(e) => this.refreshToken()}></span>
          </fieldset>
          <fieldset>
            <input type="button" value="登录" onClick={(e) => register()} />
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
    register: () => {
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
    }
  })
)(RegisterComponent);