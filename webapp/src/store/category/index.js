import posts from './posts';
import actives from './actives';
import pager from './pager';
import { combineReducers } from 'redux';

export default combineReducers({
  posts,
  actives,
  pager
});