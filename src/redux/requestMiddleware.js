import axios from 'axios';
import {BASE_URL, PROXY_URL, useProxy} from '../config/dev';

import {getQueryParamsString} from '../helpers/queryHelper';
import {error} from 'react-toastify-redux';

const requestMiddleware = (store) => (next) => (action) => {
  if (action.request && !action.request.customHandle) {
    next(action);

    const defaultHeaders = {
      'Access-Control-Allow-Origin': '*/*',
      'origin': 'recipe-book-app-mk-2',
    };

    const {
      url,
      method,
      payload,
      onSuccess,
      onFailure,
      headers = {},
      queryParams,
    } = action.request;

    const fullHeaders = {...defaultHeaders, ...headers};


    const fullUrl =
      (useProxy ? PROXY_URL : '') +
      BASE_URL +
      url +
      getQueryParamsString(queryParams);

    console.log('fullUrl', fullUrl);

    const dataOrParams = method.includes(['GET', 'DELETE']) ? 'params' : 'data';

    return axios.request({
      url: fullUrl,
      method,
      headers: fullHeaders,
      [dataOrParams]: payload,
    }).then(({data}) => {
      console.log('Success', data);
      if (onSuccess) {
        store.dispatch({
          type: onSuccess,
          result: data,
        });
      }
    }).catch((er) => {
      console.log('Failure', er.message);
      store.dispatch(error(er.message));
      if (onFailure) {
        store.dispatch({
          type: onFailure,
          error: er,
        });
      }
    });
  }

  return next(action);
};

export default requestMiddleware;
