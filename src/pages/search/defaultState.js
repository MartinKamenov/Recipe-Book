import immutable from 'immutable';
import {getPreviousRecipesInfo} from '../../helpers/localStorage';

const storageRecipeInfo = getPreviousRecipesInfo();

export default immutable.fromJS({
  recipes: storageRecipeInfo ? storageRecipeInfo.recipes : '',
  loading: !(storageRecipeInfo && storageRecipeInfo.recipes),
  initialyFetched: storageRecipeInfo && storageRecipeInfo.recipes,
  lastPayload: null,
  paging: {
    page: storageRecipeInfo ? storageRecipeInfo.recipes ? 2 : 1 : 1,
    lastPage: false,
  },
  searching: {
    inredients: storageRecipeInfo ? storageRecipeInfo.inredients : '',
    text: storageRecipeInfo ? storageRecipeInfo.text : '',
  },
});
