import post from './post';
import { prev, next, top5 } from './links';
import comments from './comment';
import { combineReducers } from 'redux';

export default combineReducers({
  post,
  prev,
  next,
  top5,
  comments
});