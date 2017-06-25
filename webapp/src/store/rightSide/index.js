import active from './active';
import categories from './categories';
import posts from './posts';
import type from './type';
import { combineReducers } from 'redux';

export default combineReducers({
  active,
  type,
  posts,
  categories
});