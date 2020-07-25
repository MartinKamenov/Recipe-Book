const RECIPES_KEY = 'RECIPES_KEY';

export const getPreviousRecipesInfo = () => {
  const storageItem = localStorage.getItem(RECIPES_KEY);
  return storageItem ? JSON.parse(storageItem) : null;
};

export const setPreviousRecipesInfo = (key, value) => {
  let recipesInfo = localStorage.getItem(RECIPES_KEY);
  recipesInfo = recipesInfo ? JSON.parse(recipesInfo) : {
    ingredients: '',
    text: '',
    recipes: [],
  };
  recipesInfo[key] = value;
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipesInfo));
};
