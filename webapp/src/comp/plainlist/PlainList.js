import React, { Component } from 'react';
import './PlainList.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../action';

class PlainListComponent extends Component {
  componentDidMount() {
    const { categories, fetchCategories } = this.props;

    if (categories.length) {
      return;
    }

    fetchCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="plain-list-root">
        <div className="plain-list-title">所有分类</div>
        <ul>
          {categories.map(category => (
            <li key={category.BlogCategoryId}><Link to={`/category/${category.BlogCategoryId}`}>{category.BlogCategoryName}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

export const CategoryList = connect(
  (state) => ({
    categories: state.categories
  }),
  (dispatch) => ({
    fetchCategories: () => {
      dispatch(getCategories());
    }
  })
)(PlainListComponent);