import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './PostItem.css';
import defaultCover from './article.png';
import { getAPI } from '../../../http';
import { calcClassName } from '../../../util';
import { IframeContent } from '../../content';

class PostItem extends Component {

  render() {
    const { data, active } = this.props;
    return (
      <div className={calcClassName({
        "fancy-list-item": true,
        "active": active
      })} onClick={(e) => this.articleClicked(data.BlogPostId)}>
        <div className="fancy-list-cover">
          <img src={data.Screenshots.length ? getAPI("server") + `/${data.Screenshots[0].ScreenshotUrl}` : defaultCover}
            alt={data.BlogPostName} width="128" height="128" />
        </div>
        <div className="fancy-list-date">
          {new Date(data.BlogPostUpdateTime).toDateString()}
        </div>
        <div className="fancy-list-title">
          <h1>{data.BlogPostName}</h1>
        </div>
        <div className="fancy-list-brief">
          <IframeContent url={data.BlogPostScript}></IframeContent>
        </div>
      </div>
    );
  }

  articleClicked(postId) {
    const { history } = this.props;
    history.push(`/post/${postId}`);
  }

}

export const PostItemWithRouter = withRouter(PostItem);