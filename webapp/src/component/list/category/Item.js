import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Item.css';
import { connect } from 'react-redux';
import { getUrl } from '../../../api';

class Item extends Component {
  componentDidMount() {
    const { category } = this.props;
    getUrl(`http://${document.domain}:8082${category.url}`).then(html => {
      this.contentEl.innerHTML = html;
      let scriptElem = document.createElement('script');
      scriptElem.src = `http://${document.domain}:8082${category.script}`;
      // scriptElem.onload = function () {
      //     console.log('halo');
      // };
      this.contentEl.appendChild(scriptElem);
    });
  }

  render() {
    const { category, goDetail, goPosts } = this.props;
    return (
      <li className="category-item">
        <div className="category-title">{category.name}</div>
        <div ref={content => this.contentEl = content} className="category-content"></div>
        <div className="App-btns two">
          <div className="App-btn" onClick={goDetail}><Link to={`/cateogry/${category.id}`}>详情</Link></div>
          <div className="App-btn" onClick={goPosts}>Posts</div>
        </div>
      </li>
    );
  }
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    goDetail: () => {
      
    },
    goPosts: () => {
      
    }
  })
)(Item);
