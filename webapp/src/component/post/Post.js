import React, { Component } from "react";
import "./Post.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class PostComponent extends Component {
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
        Hello World, PostId : {match.params.postName}.
      </div>
    );
  }
}

export default withRouter(connect(
  null,
  (dispatch) => ({
    fetch: dispatch
  })
)(PostComponent));