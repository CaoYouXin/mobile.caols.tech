import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configeStore from './store';
import './index.css';
import App from './App';
import Header from "./component/header/Header";
import List from "./component/list/List";
import Category from './component/category/Category';
import Post from './component/post/Post';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={configeStore()}>
        <Router>
            <App>
                <Header />
                <Route exact={true} path='/' component={List} />
                <Route path='/cateogry/:categoryName' component={Category} />
                <Route path='/post/:postName' component={Post} />
            </App>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
