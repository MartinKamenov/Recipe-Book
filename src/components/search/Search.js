import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

const Search = ({inputParams, onSearch, updateValue}) => {
  return (
    <div className='search-container'>
      {inputParams.map((params, i) => (
        <input key={i}
          placeholder={params.placeholder}
          value={params.value}
          onChange={
            ({target: {value}}) => updateValue(params.key, value)
          }
        />
      ))}

      <div onClick={onSearch} className='btn btn-primary'>Search</div>
    </div>
  );
};

Search.propTypes = {
  inputParams: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default Search;
