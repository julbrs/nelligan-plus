import { combineReducers } from 'redux';
import books from './books';
import cards from './cards';
// import authUser from './reducers/authUser';
//import common from './reducers/common';
//mport { routerReducer } from 'react-router-redux';

export default combineReducers({
  books,
  cards,
//  common,
//  router: routerReducer
});