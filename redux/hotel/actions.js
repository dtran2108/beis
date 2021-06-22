import * as types from './types';
import _ from 'lodash';
import apiAction, { defaultAction } from '../utils/createAction';
import { parseObjToQuery } from '~/utils/helpers';

export const getHotels = (params) =>
  apiAction('get')(types.GET_HOTELS, `https://6099e79f0f5a130017219c0a.mockapi.io/api/v1/hotels${parseObjToQuery(params)}`, {}, false);

export const getHotelDetail = (id) =>
  apiAction('get')(types.GET_HOTEL_DETAIL, `https://6099e79f0f5a130017219c0a.mockapi.io/api/v1/hotels/${id}`, {}, false);

export const createHotel = (body) =>
  apiAction('post')(types.CREATE_HOTEL, `https://6099e79f0f5a130017219c0a.mockapi.io/api/v1/hotels`, body, false);

export const editHotel = (id, body) =>
  apiAction('put')(types.EDIT_HOTEL, `https://6099e79f0f5a130017219c0a.mockapi.io/api/v1/hotels/${id}`, body, false);

export const deleteHotel = (id) =>
  apiAction('delete')(types.DELETE_HOTELS, `https://6099e79f0f5a130017219c0a.mockapi.io/api/v1/hotels/${id}`, {}, false);
