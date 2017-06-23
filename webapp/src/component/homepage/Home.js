import React, { Component } from 'react';
import './Home.css';
import FancyList from '../homepage-posts/FancyList';
import PlainList from '../homepage-categories/PlainList';

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <FancyList />
        <PlainList />
      </div>
    );
  }
}

export default HomeComponent;