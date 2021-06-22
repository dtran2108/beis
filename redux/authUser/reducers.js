import produce from 'immer';
import { isEqual } from 'lodash';
import { getString } from '~/views/utils/helpers/utilObject';
import { addAuthoz, removeAuthoz } from '../utils/session';
import * as types from './types';

const initialState = {
  user: null,
  isAuthenticated: false,
  rememberMe: 1,
  loginInfo: null
};

const reducer = (state, { type, payload }) => {
  let typeTrueStr = getString(type, undefined, '');
  switch (
    typeTrueStr.replace('_SUCCESS', '') //_ from `${action.type}_SUCCESS`
  ) {
    case types.LOGIN:
      if (payload) {
        addAuthoz(getString(payload?.data, 'id_token'), state.rememberMe);
      }
      return {
        ...state,
        isAuthenticated: true
      };
    case types.SET_REMBERME:
      return {
        ...state,
        rememberMe: 365
      };
    case types.UNSET_REMBERME:
      return {
        ...state,
        rememberMe: 1
      };
    case types.SET_LOGIN_INFO:
      return {
        ...state,
        loginInfo: payload
      };
    case types.UNSET_LOGIN_INFO:
      return {
        ...state,
        loginInfo: null
      };
    case types.LOGOUT:
      removeAuthoz();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case types.GET_USER: {
      if (!isEqual(state.user, payload)) {
        return {
          ...state,
          user: payload?.data,
          isAuthenticated: true
        };
      }
      return {
        ...state
      };
    }
    case types.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...payload?.data }
      };
    default:
      return state || {};
  }
};

export default reducer;
