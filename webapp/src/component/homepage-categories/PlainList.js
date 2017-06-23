import React, { Component } from 'react';
import './PlainList.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategory } from '../../action';

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
            <li key={category.id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    categories: state.categories
  }),
  (dispatch) => ({
    fetchCategories: () => {
      dispatch(getCategory());
    }
  })
)(PlainListComponent);