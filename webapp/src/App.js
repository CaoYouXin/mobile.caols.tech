import React, {Component} from "react";
import fixScreen from "./util/FixScreen";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            landscape: null
        };
    }

    componentWillMount() {
        this.isLandscape();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.isLandscape.bind(this), false);
    }

    isLandscape(event) {
        if (window['orientation'] === 180 || window['orientation'] === 0) {
            fixScreen();
            this.setState({landscape: false});
        } else if (window['orientation'] === 90 || window['orientation'] === -90) {
            this.setState({landscape: true});
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div className="test"></div>
                {this.state.landscape && <div id="explain_portrait_and_landscape">
                    <div>请竖起你的设备，谢谢合作！</div>
                </div>}
            </div>
        );
    }
}

export default App;
