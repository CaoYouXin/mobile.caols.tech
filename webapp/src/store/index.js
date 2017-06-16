import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import pager from './pager';
import { list as listType, data as listData } from './list';
import briefHeader from './briefHeader';

export default function configeStore() {
  let middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(combineReducers({
    listType,
    listData,
    pager,
    briefHeader
  }), applyMiddleware(...middlewares));
}

export { getPage } from './pager';