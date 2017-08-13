import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configeStore from './store';
import './index.css';
import App from './App';
import Header from "./comp/header/Header";
import LeftSide from "./comp/left-side/Info";
import RightSide from "./comp/right-side/SearchResult";
import Home from "./comp/homepage/Home";
import Post from './comp/post/Post';
import Category from './comp/category/Category';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={configeStore()}>
    <Router>
      <App>
        <Header />
        <LeftSide />
        <RightSide />
        <Route exact={true} path='/' component={Home} />
        <Route path='/post/:postId' component={Post} />
        <Route path='/category/:categoryId' component={Category} />
      </App>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
