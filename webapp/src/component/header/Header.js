import React, { Component } from "react";
import "./Header.css";
import { connect } from 'react-redux';
import logo from "./logo.svg";
import search from "./search.png";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };

    this.inputFocused = this.inputFocused.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.keyUp = this.keyUp.bind(this);
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

  render() {
    let headerClassName = 'App-header';
    if (this.props.brief) {
      headerClassName += ' brief';
    }

    let searchClassName = 'App-search';
    if (this.state.focused) {
      searchClassName += ' focused';
    }

    return (
      <div>
        <div className={headerClassName}>
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <div className={searchClassName}>
            <img src={search} alt="search" />
            <input ref={(input) => { this.inputEl = input }}
              onKeyUp={this.keyUp}
              type="search" placeholder="搜索" />
          </div>
        </div>
        <div style={{
          transition: 'height 1s',
          height: this.props.brief ? '66px' : '220px'
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
