import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/common/loader';
import RecipeList from '../../components/recipe/list';
import {getRecipes, updateSearchValue} from './actions';
import './SearchPage.scss';
import Search from '../../components/search';
import {
  getQueryParamsString,
  getQueryParamsObject,
} from '../../helpers/queryHelper';
import PropTypes from 'prop-types';

const SearchPage = ({history, location}) => {
  const OFFSET = 150;
  const recipeState = useSelector((globalState) => globalState.recipes).toJS();
  const {loading, recipes, searching, initialyFetched, paging} = recipeState;

  const page = paging.page;
  const lastPage = paging.lastPage;

  const [fetchNextPage, setShouldFetchNextPage] = useState(false);

  const dispatch = useDispatch();

  const updateValue = useCallback(
      (key, value) => dispatch(updateSearchValue(key, value)),
      [dispatch],
  );

  useEffect(() => {
    if (!initialyFetched) {
      const initialSearch = getQueryParamsObject(location.search);
      Object.keys(initialSearch)
          .forEach((key) => updateValue(key, initialSearch[key]));
      dispatch(getRecipes(page, initialSearch));
    }
  }, [initialyFetched, dispatch, page, location, updateValue]);

  useEffect(() => {
    if (!loading && fetchNextPage && !lastPage) {
      setShouldFetchNextPage(false);
      dispatch(getRecipes(page, searching));
    }
  }, [fetchNextPage, loading, dispatch, lastPage, page, searching]);


  const handleScroll = ({target}) => {
    const offsetFromTop =
      target.scrollHeight - (target.scrollTop + target.offsetHeight);
    if (offsetFromTop < OFFSET) {
      setShouldFetchNextPage(true);
    }
  };

  const handleSearch = () => {
    history.push({
      search: getQueryParamsString(searching),
    });
    dispatch(getRecipes(page, searching, true));
  };

  const inputParams = [
    {
      placeholder: 'Key words',
      key: 'text',
    },
    {
      placeholder: 'Ingredients',
      key: 'ingredients',
    },
  ].map((i) => ({...i, value: searching[i.key]}));

  return (
    <div className='search-page' onScroll={handleScroll}>
      <Search onSearch={handleSearch}
        updateValue={updateValue}
        inputParams={inputParams}/>
      {!initialyFetched ? (
                <Loader message='Fetching recipes'/>
            ) : (
                <>
                  <RecipeList recipes={recipes}/>
                  {lastPage || (
                    <Loader message='Fetching more recipes'/>
                  )}
                </>
            )}
    </div>
  );
};

SearchPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchPage;
