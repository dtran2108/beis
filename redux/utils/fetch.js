import isomorphicFetch from 'isomorphic-fetch';
import { useStore } from '~/redux/store';
import authHeader from './authHeader';
import { authActions } from '~/redux/authUser/index';
import { API_CODE } from '~/configs';
import getServerError from '~/configs/serverErrors';

export const requestHeaders = (withToken, ctx) => {
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (withToken) {
    header = {
      ...header,
      ...authHeader(ctx)
    };
  }
  return header;
};

const fetch = (url, method, body, withToken, ctx, headerParams = {}) => {
  // const store = useStore();
  let options = {
    method: method ? method : 'get',
    headers: requestHeaders(withToken, ctx)
  };

  //Fix for Edge cannot have body in options
  if (method !== 'get') {
    options = {
      ...options,
      body: JSON.stringify(body)
    };
  }

  /**
   * THIS IS BASE CONFIG
   * @Author: tan.hoang@vslsoft.com
   * @Date: 2021-04-15 08:33:55
   */
  return isomorphicFetch(url, options).then((res) => {
    let httpStatus = res.status;
    let resHeaders = {};
    try {
      res.headers.forEach((value, name) => {
        resHeaders[name] = value;
      });
    } catch (error) {
      console.log(`develop - ithoangtan -  ~ file: fetch.js ~ line 50 ~ returnisomorphicFetch ~ error`, error);
    }

    return new Promise(async (resolve, reject) => {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      try {
        if (httpStatus >= 200 && httpStatus <= 299) {
          // Successful responses
          if (httpStatus === 204) {
            // for no content resolve need => then()
            resolve({
              res: { message: API_CODE.SUCCESS },
              headers: resHeaders
            });
          }
          let json = await res.json();
          resolve({ data: json, headers: resHeaders });
        } else if (httpStatus >= 400 && httpStatus <= 499) {
          // Client error responses
          let json = await res.json();
          switch (httpStatus) {
            case 400:
            case 404:
              reject(json);
              break;
            case 401:
            case 403:
              // store.dispatch(authActions.logout());
              reject(json);
              break;
            default:
              reject(getServerError({ message: API_CODE.SOMETHING_ERROR_4X }));
              break;
          }
        } else if (httpStatus >= 500 && httpStatus <= 599) {
          // Server error responses
          let json = await res.json();
          reject(json);
        } else {
          reject(getServerError({ message: API_CODE.SERVER_MAINTENANCE }));
        }
      } catch (error) {
        console.error(`develop - ithoangtan -  ~ file: fetch.js ~ line 98 ~ returnnewPromise ~ error`, error);
      }
    });
  });
};

export default fetch;
