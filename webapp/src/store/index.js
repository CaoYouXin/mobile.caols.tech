import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import briefHeader from './briefHeader';
import leftSideActive from './leftSide';
import categories from './categories';
import posts from './posts';
import post from './post';

export default function configeStore() {
  let middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(combineReducers({
    categories,
    posts,
    post,
    briefHeader,
    leftSideActive,
  }), applyMiddleware(...middlewares));
}