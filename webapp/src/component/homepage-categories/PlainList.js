import React, { Component } from 'react';
import './PlainList.css';
import { connect } from 'react-redux';

class PlainListComponent extends Component {
  render() {

    return (
      <div className="plain-list-root">
        <ul>
          
        </ul>
      </div>
    );
  }
}

export default connect(
  
)(PlainListComponent);