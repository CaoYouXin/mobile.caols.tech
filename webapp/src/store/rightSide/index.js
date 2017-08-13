import active from './active';
import categories from './categories';
import posts from './posts';
import { combineReducers } from 'redux';

export default combineReducers({
  active,
  posts,
  categories
});