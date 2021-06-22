import * as types from './types';
import _ from 'lodash';
import apiAction, { defaultAction } from '../utils/createAction';
import { parseObjToQuery } from '~/utils/helpers';

// ----------------------------------------------------------------
// ACCOUNT CARDS
// ----------------------------------------------------------------
export const getCards = (params) =>
  apiAction('get')(types.GET_CARDS, `https://60ab727c5a4de40017cca1c7.mockapi.io/account-cards${parseObjToQuery(params)}`, {}, false);

export const getCardDetail = (id) =>
  apiAction('get')(types.GET_CARD_DETAIL, `https://60ab727c5a4de40017cca1c7.mockapi.io/account-cards/${id}`, {}, false);

export const createCard = (body) =>
  apiAction('post')(types.CREATE_CARD, `https://60ab727c5a4de40017cca1c7.mockapi.io/account-cards`, body, false);

export const editCard = (id, body) =>
  apiAction('put')(types.EDIT_CARD, `https://60ab727c5a4de40017cca1c7.mockapi.io/account-cards/${id}`, body, false);

export const deleteCard = (id) =>
  apiAction('delete')(types.DELETE_CARDS, `https://60ab727c5a4de40017cca1c7.mockapi.io/account-cards/${id}`, {}, false);
// ----------------------------------------------------------------
// ACCOUNT CARDS
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// CARD TRANSACTION
// ----------------------------------------------------------------
export const getCardTransaction = (params) =>
  apiAction('get')(
    types.GET_CARD_TRANSACTION,
    `https://609ce69b04bffa001792d8bf.mockapi.io/card-transaction${parseObjToQuery(params)}`,
    {},
    false
  );
