import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import configeStore from './store';

ReactDOM.render(
<Provider store={configeStore()}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
