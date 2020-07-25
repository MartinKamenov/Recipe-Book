import React from 'react';
import Spinner from 'react-loader-spinner';
import PropTypes from 'prop-types';
import './Loader.scss';

const Loader = ({message='Loading'}) => {
  return (
    <div className='loader-container'>
      <Spinner
        type='ThreeDots'
        color="#000000"
        height={100}
        width={100}
      />
      <div>{message}</div>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
};

export default Loader;
