import list from './list';
import pager from './pager';
import actives from './actives';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  pager,
  actives
});