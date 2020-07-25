export const getQueryParamsString = (queryParamsObject) => {
  const queryParamsKeys = Object.keys(queryParamsObject);
  if (!queryParamsKeys.length) {
    return '';
  }

  return '?' + queryParamsKeys
      .filter((key) => queryParamsObject[key])
      .map((key) => `${key}=${queryParamsObject[key]}`)
      .join('&');
};

export const getQueryParamsObject = (queryParamsString) => {
  return queryParamsString
      .substring(1, queryParamsString.length)
      .replace(/%20/g, ' ')
      .split('&')
      .reduce((acc, curr) => {
        const pair = curr.split('=');
        return {...acc, [pair[0]]: pair[1]};
      }, {});
};
