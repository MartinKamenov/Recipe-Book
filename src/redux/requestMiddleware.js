import axios from 'axios';
import {BASE_URL, PROXY_URL, useProxy} from '../config/dev';

import {getQueryParamsString} from '../helpers/queryHelper';

const requestMiddleware = (store) => (next) => (action) => {
  if (action.request && !action.request.customHandle) {
    next(action);

    const defaultHeaders = {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': '*/*',
      'Access-Control-Allow-Headers': 'x-access-token, Origin, X-Requested-With, Content-Type, Accept',
      'origin': 'recipe-book-app-mk-2',
    };

    const {url, method, payload, onSuccess, onFailure, headers = {}, queryParams} = action.request;
    const fullHeaders = {...defaultHeaders, ...headers};


    const fullUrl = (useProxy ? PROXY_URL : '') + BASE_URL + url + getQueryParamsString(queryParams);
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
    }).catch((error) => {
      console.log('Failure', error.message);
      if (onFailure) {
        store.dispatch({
          type: onFailure,
          error,
        });
      }
    });
  }

  return next(action);
};

export default requestMiddleware;
