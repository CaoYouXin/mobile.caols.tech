import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configeStore from './store';
import './index.css';
import App from './App';
import Header from "./component/header/Header";
import LeftSide from "./component/left-side/Info";
import Home from "./component/homepage/Home";
import Post from './component/post/Post';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={configeStore()}>
        <Router>
            <App>
                <Header />
                <LeftSide />
                <Route exact={true} path='/' component={Home} />
                <Route path='/post/:postName' component={Post} />
            </App>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
