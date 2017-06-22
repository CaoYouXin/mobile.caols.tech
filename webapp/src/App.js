import React, { Component } from "react";
import "./App.css";
import { fixScreen } from "./util";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      landscape: null,
    };
  }

  componentWillMount() {
    this.isLandscape();
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.isLandscape.bind(this), false);
  }

  isLandscape(event) {
    if (window['orientation'] === 180 || window['orientation'] === 0) {
      fixScreen();
      this.setState({ landscape: false });
    } else if (window['orientation'] === 90 || window['orientation'] === -90) {
      this.setState({ landscape: true });
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
        {this.state.landscape && <div id="explain_portrait_and_landscape" className="v-mid-box">
          <div>请竖起你的设备，谢谢合作！</div>
        </div>}
      </div>
    );
  }
}

export default App;
