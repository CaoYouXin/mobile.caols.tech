import React, { Component } from "react";
import "./Header.css";
import logo from "./logo.svg";
import search from "./search.png";
import { connect } from 'react-redux';
import { calcClassName } from '../../util';
import { setLeftSide, makeSearch } from '../../action';
import analysis from './analysis';

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
      const analysisResult = analysis(this.inputEl.value);
      if (analysisResult.error) {
        alert(analysisResult.error);
        return;
      }

      this.props.search(analysisResult);
    }
  }

  inputFocused() {
    this.setState({ focused: true });
  }

  inputBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { brief, logoClicked } = this.props;

    return (
      <div>
        <div className={calcClassName({
          "App-header": true,
          "brief": !!brief
        })}>
          <img src={logo} className="App-logo" alt="logo"
            onClick={(e) => logoClicked()} />
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
          height: !!brief ? '66px' : '500px'
        }}></div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    brief: state.briefHeader
  }),
  (dispatch) => ({
    logoClicked: () => {
      dispatch(setLeftSide(true));
    },
    search: (analysisResult) => {
      dispatch(makeSearch(analysisResult));
    }
  })
)(HeaderComponent);
