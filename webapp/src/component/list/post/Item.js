import React, { Component } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    const { post } = this.props;
    return (
      <li className="post-item">
        <div className="post-title">{post.name}</div>
        <div className="post-brief">{post.brief}</div>
        <div className="App-btns one">
          <div className="App-btn"><Link to={`/post/${post.id}`}>详情</Link></div>
        </div>
      </li>
    );
  }
}

export default Item;