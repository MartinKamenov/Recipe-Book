import React from 'react';
import PropTypes from 'prop-types';
import './RecipeDetails.scss';

const RecipeDetails = ({recipe}) => {
  return (
    <div className='col-md-4 col-lg-3 col-sm-6'>
      <a href={recipe.href}
        target='_blank'
        className='recipe-link'
        rel='noopener noreferrer'>
        <div className='recipe-details-container'>
          <img alt={recipe.title} className='recipe-image'
            src={recipe.thumbnail || '/default_recipe.jpg'}/>
          <h3 className='header'>{recipe.title}</h3>
          <div>{recipe.ingredients}</div>
        </div>
      </a>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
