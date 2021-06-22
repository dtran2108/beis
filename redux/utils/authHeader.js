import { getCookie } from './session';

export const authHeader = (ctx) => {
  // return authorization header with jwtConsumer token
  // let userToken = localStorage.getItem('userToken');

  const isServer = typeof window === 'undefined';

  let token = isServer ? getCookie('jwtConsumer', ctx.req) : getCookie('jwtConsumer');
  token = (token || '').trim().length === 0 ? undefined : token;
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return { Authorization: 'Bearer ---------' };
  }
};

export default authHeader;
