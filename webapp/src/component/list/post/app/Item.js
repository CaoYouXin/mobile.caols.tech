import React, { Component } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  goDetails(e, url) {
    e.preventDefault();
    window.open(`http://${document.domain}:8082${url}`);
  }

  render() {
    const { post } = this.props;
    return (
      <li className="post-item">
        <div className="post-title">{post.name}</div>
        <div className="App-btns two in-middle">
          <div className="App-btn">{post.create} 创建</div>
          <div className="App-btn">{post.update} 更新</div>
        </div>
        <div className="post-content"><img src={`http://${document.domain}:8082${post.screenshot}`} alt={post.name}/></div>
        <div className="App-btns one">
          <div className="App-btn"><a href="" onClick={e => this.goDetails(e, post.url)}>详情</a></div>
        </div>
      </li>
    );
  }
}

export default Item;