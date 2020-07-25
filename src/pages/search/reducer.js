import * as actionTypes from './actionTypes';
import defaultState from './defaultState';

export default (state=defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECIPES:
      if (action.newSearch) {
        return state.set('loading', true)
          .set('initialyFetched', false)
          .set('recipes', [])
          .setIn(['paging', 'lastPage'], false);
      }
      return state.set('loading', true);
    case actionTypes.GET_RECIPES_SUCCESS:
      const {results: recipes} = action.result;
      const page = state.getIn(['paging', 'page']);
      const currentRecipes = state.get('recipes');

      if (recipes.length === 0) {
        return state.set('loading', false)
            .set('initialyFetched', true)
            .setIn(['paging', 'lastPage'], true);
      }

      return state.set('loading', false)
          .set('initialyFetched', true)
          .set('recipes', [...currentRecipes, ...recipes])
          .setIn(['paging', 'page'], page + 1);
    case actionTypes.GET_RECIPES_FAILURE:
      // const error = action.error;
      return state
        .set('loading', false)
        .set('initialyFetched', true)
        .setIn(['paging', 'lastPage'], true);
    case actionTypes.CHANGE_SEARCH_PARAMS:
      return state.setIn(['paging', 'page'], 1)
      .setIn(['searching', action.key], action.value);
    default:
      return state;
  }
};
