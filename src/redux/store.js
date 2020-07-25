import {createStore, combineReducers, applyMiddleware} from 'redux';
import {recipeReducer as recipes} from '../pages/search';
import requestMiddleware from './requestMiddleware';
import {toastsReducer as toasts} from 'react-toastify-redux';

const reducer = combineReducers({
  recipes,
  toasts,
});

export default createStore(reducer, applyMiddleware(requestMiddleware));
