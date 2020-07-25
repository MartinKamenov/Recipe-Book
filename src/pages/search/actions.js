import * as actionTypes from './actionTypes';

export const getRecipes = (page, searchParams = {}, newSearch = false) => {
  const queryParams = {p: page};
  if (searchParams.ingredients) {
    queryParams.i = searchParams.ingredients;
  }
  if (searchParams.text) {
    queryParams.q = searchParams.text;
  }

  return ({
    type: actionTypes.GET_RECIPES,
    request: {
      method: 'GET',
      url: `/api/`,
      onSuccess: actionTypes.GET_RECIPES_SUCCESS,
      onFailure: actionTypes.GET_RECIPES_FAILURE,
      queryParams,
    },
    newSearch,
  });
};

export const updateSearchValue = (key, value) => ({
  type: actionTypes.CHANGE_SEARCH_PARAMS,
  key,
  value,
});
