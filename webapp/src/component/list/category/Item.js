import React, { Component } from 'react';
import './Item.css';
import { connect } from 'react-redux';
import { getUrl } from '../../../api';
import { getPostByCategoryName } from '../../../action';

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
    const { category, goPosts } = this.props;
    return (
      <li className="category-item">
        <div className="category-title">{category.name}</div>
        <div className="App-btns two in-middle">
          <div className="App-btn">{category.create} 创建</div>
          <div className="App-btn">{category.update} 更新</div>
        </div>
        <div ref={content => this.contentEl = content} className="category-content"></div>
        <div className="App-btns one">
          <div className="App-btn"><a href="" onClick={(e) => goPosts(e, category.name)}>Posts</a></div>
        </div>
      </li>
    );
  }
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    goPosts: (e, categoryName) => {
      e.preventDefault();
      dispatch(getPostByCategoryName(categoryName))
    }
  })
)(Item);
