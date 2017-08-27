import post from './post';
import { prev, next } from './links';
import { liked } from './liked';
import comments from './comment';
import { combineReducers } from 'redux';

export default combineReducers({
  post,
  prev,
  next,
  liked,
  comments
});