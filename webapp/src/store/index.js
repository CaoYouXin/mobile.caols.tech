import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import category from './category';
import post from './post';
import pager from './pager';
import selectList from './list';
import briefHeader from './briefHeader';

export default function configeStore() {
    let middlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    return createStore(combineReducers({
        post,
        category,
        pager,
        selectList,
        briefHeader
    }), applyMiddleware(...middlewares));
}

export { getPage } from './pager';