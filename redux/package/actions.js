import * as types from './types';
import _ from 'lodash';
import apiAction, { defaultAction } from '../utils/createAction';
import { parseObjToQuery } from '~/utils/helpers';

export const getPackages = (params) =>
  apiAction('get')(types.GET_PACKAGES, `https://60969fe0116f3f00174b35e1.mockapi.io/api/v1/packages${parseObjToQuery(params)}`, {}, true);

export const getPackageDetail = (id) =>
  apiAction('get')(types.GET_PACKAGE_DETAIL, `https://60969fe0116f3f00174b35e1.mockapi.io/api/v1/packages/${id}`, {}, true);

export const createPackage = (body) =>
  apiAction('post')(types.CREATE_PACKAGE, `https://60969fe0116f3f00174b35e1.mockapi.io/api/v1/packages`, body, true);

export const editPackage = (id, body) =>
  apiAction('put')(types.EDIT_PACKAGE, `https://60969fe0116f3f00174b35e1.mockapi.io/api/v1/packages/${id}`, body, true);

export const deletePackage = (id) =>
  apiAction('delete')(types.DELETE_PACKAGES, `https://60969fe0116f3f00174b35e1.mockapi.io/api/v1/packages/${id}`, {}, true);
