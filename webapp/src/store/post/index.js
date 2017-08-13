import post from './post';
import { prev, next } from './links';
import comments from './comment';
import { combineReducers } from 'redux';

export default combineReducers({
  post,
  prev,
  next,
  comments
});