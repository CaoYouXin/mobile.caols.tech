import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import briefHeader from './briefHeader';
import post from './post';
import { prev, next, top5 } from './links';
import comments from './comment';
import categories from './categories';
import posts from './posts';

export default function configeStore() {
  let middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(combineReducers({
    categories,
    posts,
    briefHeader,
    post,
    prev,
    next,
    top5,
    comments
  }), applyMiddleware(...middlewares));
}