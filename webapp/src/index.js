import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configeStore from './store';
import './index.css';
import App from './App';
import Header from "./component/header/Header";
import List from "./component/list/List";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={configeStore()}>
        <Router>
            <App>
                <Header />
                <Route exact={true} path='/' component={List} />
            </App>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
