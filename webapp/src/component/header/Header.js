import React, { Component } from "react";
import "./Header.css";
import { connect } from 'react-redux';
import logo from "./logo.svg";
import search from "./search.png";
import calcClassName from '../../util/calcClassName';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };

    this.inputFocused = this.inputFocused.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.logoClicked = this.logoClicked.bind(this);
  }

  componentDidMount() {
    this.inputEl.addEventListener('focus', this.inputFocused, false);
    this.inputEl.addEventListener('blur', this.inputBlur, false);
  }

  componentWillUnmount() {
    this.inputEl.removeEventListener('focus', this.inputFocused);
    this.inputEl.removeEventListener('blur', this.inputBlur);
  }

  keyUp(e) {
    if (e.keyCode === 13) {
      alert(this.inputEl.value);
    }
  }

  inputFocused() {
    this.setState({ focused: true });
  }

  inputBlur() {
    this.setState({ focused: false });
  }

  logoClicked() {
    console.log('logo clicked.');
  }

  render() {
    return (
      <div>
        <div className={calcClassName({
          "App-header": true,
          "brief": !!this.props.brief
        })}>
          <img src={logo} className="App-logo" alt="logo"
            onClick={(e) => this.logoClicked()} />
          <br />
          <div className={calcClassName({
            "App-search": true,
            "focused": this.state.focused
          })}>
            <img src={search} alt="search" />
            <input ref={(input) => { this.inputEl = input }}
              onKeyUp={this.keyUp}
              type="search" placeholder="搜索" />
          </div>
        </div>
        <div style={{
          transition: 'height 1s',
          height: this.props.brief ? '66px' : '500px'
        }}></div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    brief: state.briefHeader
  })
)(HeaderComponent);
