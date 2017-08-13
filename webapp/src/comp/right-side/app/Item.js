import React, { Component } from 'react';
import './Item.css';
import defaultCover from './article.png';
import { getAPI } from '../../../http';

class Item extends Component {
  goDetails(e, url) {
    e.preventDefault();
    this.props.onClick();
    window.open(url, "_blank");
  }

  render() {
    const { post } = this.props;
    return (
      <li className="post-item">
        <div className="post-title">{post.BlogPostName}</div>
        <div className="App-btns two in-middle">
          <div className="App-btn">{post.BlogPostCreateTime} 创建</div>
          <div className="App-btn">{post.BlogPostUpdateTime} 更新</div>
        </div>
        <div className="post-content">
          <img src={post.Screenshots.length ? getAPI("server") + `/${post.Screenshots[0].ScreenshotUrl}` : defaultCover}
            alt={post.BlogPostName} />
        </div>
        <div className="App-btns one">
          <div className="App-btn"><a href="" onClick={e => this.goDetails(e, post.BlogPostUrl)}>详情</a></div>
        </div>
      </li>
    );
  }
}

export default Item;