import React, { Component } from 'react';
import './Info.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { calcClassName } from '../../util';
import { setLeftSide, setLeftSideMode } from '../../action';
import Login from './login/Login';
import Register from './register/Register';
import { clearButToken } from '../../util';

class InfoComponent extends Component {
  toGithub() {
    window.location.href = "https://github.com/CaoYouXin";
  }

  toStory() {
    window.location.href = "http://diary.caols.tech/";
  }

  toHomePage() {
    const { close } = this.props;
    close();
    clearButToken();
    window.location.href = `${window.location.protocol}//${document.domain}:${window.location.port}`;
  }

  render() {
    const { active, close, mode, toLoginMode, logout, username } = this.props;
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
            <div className="img" onClick={(e) => this.toHomePage()}></div>
          </div>
          {{
            "unlogined": (<div className="info-btn" onClick={(e) => toLoginMode()}>登录/注册</div>),
            "login": (<Login />),
            "register": (<Register />),
            "logined": (<div>
              <p className="text">Hey, <strong>{username}</strong></p>
              <p className="text">欢迎登录我的博客，希望在这里你可以找到想要的文章...</p>
              <div className="info-btn" onClick={(e) => this.toGithub()}>查看Github</div>
              <div className="info-btn" onClick={(e) => this.toStory()}>查看履历</div>
              <br />
              <div className="info-btn" onClick={(e) => logout()}>退出登录</div>
            </div>)
          }[mode]}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    active: state.leftSide.active,
    mode: state.leftSide.mode,
    username: state.user.userName
  }),
  (dispatch) => ({
    close: () => {
      dispatch(setLeftSide(false));
    },
    toLoginMode: () => {
      dispatch(setLeftSideMode('login'));
    },
    logout: () => {
      dispatch({
        type: 'User_Logout'
      })
    }
  })
)(InfoComponent));