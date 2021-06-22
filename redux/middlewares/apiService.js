import { API_URL } from '~/configs/index';
import { fetch } from '../utils';

const apiService = () => (next) => (action) => {
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }
  const { path, version = 'v1', method = 'get', body, withToken = false, ctx = null, headerParams, footer = false } = action.meta;
  if (!path) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  let url = process.env.API_URL + path;

  if (url.startsWith('http')) url = path;

  return fetch(url, method, body, withToken, ctx, headerParams)
    .then(
      (res) => handleResponse(res, action, next),
      (err) => handleErrors(err, action, next)
    )
    .catch((reason) => handleErrors(reason, action, next));
};

const handleErrors = (err, action, next) => {
  next({
    type: `${action.type}_FAILED`,
    payload: err,
    meta: action.meta
  });
  return Promise.reject(err);
};

const handleResponse = (res, action, next) => {
  next({
    type: `${action.type}_SUCCESS`,
    payload: res,
    meta: action.meta
  });
  return res;
};

export default apiService;
