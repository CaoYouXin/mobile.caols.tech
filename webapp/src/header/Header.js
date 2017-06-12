import React, {Component} from "react";
import "./Header.css";
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
    }

    componentDidMount() {
        this.inputEl.addEventListener('focus', this.inputFocused, false);
        this.inputEl.addEventListener('blur', this.inputBlur, false);
    }

    componentWillUnmount() {
        this.inputEl.removeEventListener('focus', this.inputFocused);
        this.inputEl.removeEventListener('blur', this.inputBlur);
    }

    inputFocused() {
        this.setState({focused: true});
    }

    inputBlur() {
        this.setState({focused: false});
    }

    render() {
        let headerClassName = 'App-header';
        let afterHeaderHeight = {
            height: '220px',
            transition: 'height 1s'
        };
        if (this.props.brief) {
            headerClassName += ' brief';
            afterHeaderHeight = {
                height: '50px',
                transition: 'height 1s'
            };
        }

        let searchClassName = 'App-search';
        if (this.state.focused) {
            searchClassName += ' focused';
        }

        return (
            <div>
                <div className={headerClassName}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <br/>
                    <div className={searchClassName}>
                        <img src={search} alt="search"/>
                        <input ref={(input) => {this.inputEl = input}} type="search" placeholder="搜索" />
                    </div>
                </div>
                <div style={afterHeaderHeight}></div>
            </div>
        );
    }
}

export default HeaderComponent;
