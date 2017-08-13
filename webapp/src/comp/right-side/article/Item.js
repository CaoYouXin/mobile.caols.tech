import React, { Component } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { IframeContent } from '../../content';

class Item extends Component {
  render() {
    const { post, onClick } = this.props;
    return (
      <li className="post-item">
        <div className="post-title">{post.BlogPostName}</div>
        <div className="App-btns two in-middle">
          <div className="App-btn">{post.BlogPostCreateTime} 创建</div>
          <div className="App-btn">{post.BlogPostUpdateTime} 更新</div>
        </div>
        <div className="post-brief">
          <IframeContent url={post.BlogPostScript}></IframeContent>
        </div>
        <div className="App-btns one">
          <div className="App-btn" onClick={onClick}><Link to={`/post/${post.BlogPostId}`}>详情</Link></div>
        </div>
      </li>
    );
  }
}

export default Item;