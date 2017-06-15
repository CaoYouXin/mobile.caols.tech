import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import category from './category';
import post from './post';
import pager from './pager';
import selectList from './list';

const list = combineReducers({
    post,
    category,
    pager,
    selectList
})

export default function configeStore() {
    const middlewares = [thunk, logger];
    return createStore(list, applyMiddleware(...middlewares));
}

export { getPage } from './pager';