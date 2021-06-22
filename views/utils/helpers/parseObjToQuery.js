import _ from 'lodash';
import queryString from 'query-string';

function parseObjToQuery(obj = {}, startWith = '?', notTrim = false) {
  if (_.isNil(obj)) return '';
  let keys = notTrim
    ? Object.keys(obj)
    : Object.keys(obj).filter((key) => !_.isNil(obj[key]) && !(_.isString(obj[key]) && obj[key].trim().length === 0));
  let params = {};

  (keys || []).map((key) => (params = { ...params, [key]: obj[key] }));

  return startWith + queryString.stringify(params);
}

export const parseParams = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring);

  const obj = {};

  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};

export default parseObjToQuery;
