import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../details';

const RecipeList = ({recipes}) => {
  // Using href as unique identifier, so I filter recipes with same href
  const filteredRecipes = recipes
      .reduce((acc, curr) => acc
          .find((r) => r.href === curr.href) ? acc : [...acc, curr], []);

  return (
    <div className='container'>
      <div className='recipe-list-container row'>
        {filteredRecipes.map((recipe) => (
          <RecipeDetails recipe={recipe} key={recipe.href}/>
        ))}
      </div>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    ingredients: PropTypes.string,
    thumbnail: PropTypes.string,
  })).isRequired,
};

export default RecipeList;
