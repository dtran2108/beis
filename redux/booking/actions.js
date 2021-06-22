import * as types from './types';
import _ from 'lodash';
import apiAction, { defaultAction } from '../utils/createAction';
import { parseObjToQuery } from '~/utils/helpers';

export const getBooking = (params) =>
  apiAction('get')(types.GET_BOOKINGS, `https://60a3129b7c6e8b0017e26689.mockapi.io/api/v1/booking${parseObjToQuery(params)}`, {}, false);

export const getBookingDetail = (id) =>
  apiAction('get')(types.GET_BOOKING_DETAIL, `https://60a3129b7c6e8b0017e26689.mockapi.io/api/v1/booking/${id}`, {}, false);

export const createBooking = (body) =>
  apiAction('post')(types.CREATE_BOOKING, `https://60a3129b7c6e8b0017e26689.mockapi.io/api/v1/booking`, body, false);

export const editBooking = (id, body) =>
  apiAction('put')(types.EDIT_BOOKING, `https://60a3129b7c6e8b0017e26689.mockapi.io/api/v1/booking/${id}`, body, false);

export const deleteBooking = (id) =>
  apiAction('delete')(types.DELETE_BOOKINGS, `https://60a3129b7c6e8b0017e26689.mockapi.io/api/v1/booking/${id}`, {}, false);
