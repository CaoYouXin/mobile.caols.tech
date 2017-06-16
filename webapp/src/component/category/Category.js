import React, { Component } from "react";
import "./Category.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CategoryComponent extends Component {
  componentDidMount() {
    this.props.fetch({
      type: 'brief_header',
      brief: true
    })
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        Hello World, CategoryId: {match.params.categoryName}.
      </div>
    );
  }
}

export default withRouter(connect(
  null,
  (dispatch) => ({
    fetch: dispatch
  })
)(CategoryComponent));