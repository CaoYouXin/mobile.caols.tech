import React, {Component} from "react";
import "./List.css";

class ListComponent extends Component {
    render() {
        return (
            <div className="App-list">
                <div className="App-btns v-mid-box">
                    <div className={this.props.active === 'category' ? "App-btn active" : "App-btn"}
                        onClick={(e) => {this.props.selectActive('category')}}>分类</div>
                    <div className={this.props.active === 'post' ? "App-btn active" : "App-btn"}
                         onClick={(e) => {this.props.selectActive('post')}}>Post</div>
                </div>
            </div>
        );
    }
}

export default ListComponent;
