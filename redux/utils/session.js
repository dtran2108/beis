import cookie from 'js-cookie';
import { JWT_CONSUMER } from '~/configs/index';

export const setCookie = (key, value, expireDay = 1) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: expireDay,
      path: '/'
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const removeAuthoz = () => {
  removeCookie(JWT_CONSUMER);
};

export const addAuthoz = (token, rememberMe) => {
  setCookie(JWT_CONSUMER, token, rememberMe);
};

export const getAuthoz = () => {
  console.log('trandev ~ file: session.js ~ line 43 ~ getAuthoz ~ cookie.get(JWT_CONSUMER)', cookie.get(JWT_CONSUMER));
  return cookie.get(JWT_CONSUMER) || '';
};

export const getCookie = (key, req) => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
