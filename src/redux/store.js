import {createStore, combineReducers, applyMiddleware} from 'redux';
import {recipeReducer as recipes} from '../pages/search';
import requestMiddleware from './requestMiddleware';

const reducer = combineReducers({
  recipes,
});

export default createStore(reducer, applyMiddleware(requestMiddleware));
