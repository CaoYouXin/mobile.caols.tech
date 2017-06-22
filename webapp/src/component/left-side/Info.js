import React, { Component } from 'react';
import './Info.css';
import { connect } from 'react-redux';
import calcClassName from '../../util/calcClassName';
import { setLeftSide } from '../../action';
import Login from './login/Login';
import Register from './register/Register';

class InfoComponent extends Component {
  toGithub() {
    window.location.href = "https://github.com/CaoYouXin";
  }

  toStory() {
    window.location.href = "http://demo.caols.tech/profile/index.html";
  }

  render() {
    const { active, close, mode, toLoginMode, logout } = this.props;
    return (
      <div>
        <div className={calcClassName({
          "info-root": true,
          "info-root-mask": true,
          "active": active
        })} onClick={(e) => close()}></div>
        <div className={calcClassName({
          "info-root": true,
          "info-root-main": true,
          "active": active
        })}>
          <div className="avatar">
            <div className="img"></div>
          </div>
          {{
            "unlogined": (<div className="info-btn" onClick={(e) => toLoginMode()}>登录/注册</div>),
            "login": (<Login />),
            "register": (<Register />),
            "logined": (<div>
              <p className="text">欢迎登录我的博客，在这里你可以找到想要的文章，以及了解我的一切...</p>
              <div className="info-btn" onClick={(e) => this.toGithub()}>查看Github</div>
              <div className="info-btn" onClick={(e) => this.toStory()}>查看履历</div>
              <br/>
              <div className="info-btn" onClick={(e) => logout()}>退出登录</div>
            </div>)
          }[mode]}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    active: state.leftSide.active,
    mode: state.leftSide.mode
  }),
  (dispatch) => ({
    close: () => {
      dispatch(setLeftSide(false));
    },
    toLoginMode: () => {
      dispatch({
        type: 'Change_Left_Mode',
        mode: 'login'
      })
    },
    logout: () => {
      dispatch({
        type: 'Change_Left_Mode',
        mode: 'unlogined'
      })
    }
  })
)(InfoComponent);