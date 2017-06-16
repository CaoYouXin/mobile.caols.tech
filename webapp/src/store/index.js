import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import pager from './pager';
import { list as listType, data as listData } from './list';
import briefHeader from './briefHeader';
import post from './post';
import { prev, next, top5 } from './links';

export default function configeStore() {
  let middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(combineReducers({
    listType,
    listData,
    pager,
    briefHeader,
    post,
    prev,
    next,
    top5
  }), applyMiddleware(...middlewares));
}

export { getPage } from './pager';