import React, { Component } from 'react';
import defaultCover from './article.png';
import './AppItem.css';
import { getAPI } from '../../../http';
import { calcClassName } from '../../../util';

export class AppItem extends Component {

  render() {
    const { data, active } = this.props;
    return (
      <div className={calcClassName({
        "fancy-list-item": true,
        "active": active
      })} onClick={(e) => this.appClicked(data.BlogPostUrl)}>
        <div className="fancy-list-screenshot">
          <img src={data.Screenshots.length ? getAPI("server") + `/${data.Screenshots[0].ScreenshotUrl}` : defaultCover}
            alt={data.BlogPostName} />
        </div>
        <div className="fancy-list-date">
          {new Date(data.BlogPostUpdateTime).toDateString()}
        </div>
        <div className="fancy-list-title">
          <h1>{data.BlogPostName}</h1>
        </div>
      </div>
    );
  }

  appClicked(url) {
    window.open(url, '_blank');
  }

}