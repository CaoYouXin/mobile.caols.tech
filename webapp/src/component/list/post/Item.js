import React, { Component } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    const { post } = this.props;
    return (
      <li className="post-item">
        <div className="post-title">{post.name}</div>
        <div className="App-btns two in-middle">
          <div className="App-btn">{post.create} 创建</div>
          <div className="App-btn">{post.update} 更新</div>
        </div>
        <div className="post-brief">{post.brief}</div>
        <div className="App-btns one">
          <div className="App-btn"><Link to={`/post/${post.name}`}>详情</Link></div>
        </div>
      </li>
    );
  }
}

export default Item;