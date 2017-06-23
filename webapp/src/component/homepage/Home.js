import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { setBrief } from '../../action';
import FancyList from '../homepage-posts/FancyList';
import PlainList from '../homepage-categories/PlainList';

class HomeComponent extends Component {
  componentDidMount() {
    const { setHeader } = this.props;
    setHeader();
  }

  render() {
    return (
      <div>
        <FancyList />
        <PlainList />
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    setHeader: () => {
      dispatch(setBrief(false));
    }
  })
)(HomeComponent);