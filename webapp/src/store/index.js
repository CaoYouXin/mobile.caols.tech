import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import briefHeader from './briefHeader';
import leftSide from './leftSide';
import categories from './categories';
import posts from './posts';
import category from './category';
import post from './post';
import user from './user';
import { toLocalStorage, fromLocalStorage } from '../util/json';
import throttle from 'lodash/throttle';

export default function configeStore() {
  let middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(combineReducers({
    categories,
    posts,
    category,
    post,
    briefHeader,
    leftSide,
    user
  }), fromLocalStorage(), applyMiddleware(...middlewares));

  store.subscribe(throttle(() => {
    toLocalStorage(store.getState());
  }, 1000));

  return store;
}