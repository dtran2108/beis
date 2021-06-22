import * as types from './types';
import apiAction from '../utils/createAction';

export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_PROVINCES: 'SET_PROVINCES'
};

export function increment() {
  return { type: actionTypes.INCREMENT };
}

export function decrement() {
  return { type: actionTypes.DECREMENT };
}

export function reset() {
  return { type: actionTypes.RESET };
}

export function setProvinces(provinces) {
  return { type: actionTypes.SET_PROVINCES, payload: provinces };
}

export const getProvinces = () => apiAction('get')(types.GET_PROVINCES, process.env.API_URL + `/api/v1/provinces?size=63`);
export const getDistricts = (province_id) =>
  apiAction('get')(types.GET_DISTRICTS, process.env.API_URL + `/api/v1/districts?provinceId=${province_id}`);
export const getWards = (district_id) => apiAction('get')(types.GET_WARDS, process.env.API_URL + `/api/wards?districtId=${district_id}`);
