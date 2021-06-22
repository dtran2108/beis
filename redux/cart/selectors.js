import { getNumber, getObject, getBool, getString, getArray } from '~/views/utils/helpers/utilObject';
import _ from 'lodash';

const cartPath = 'cart';

// favorite
export const getFavoriteProducts = (state) => {
  return state.cart.favoriteProducts;
};

// cart

export const getProductRecentAdded = (state) => state[cartPath].productRecentAdded;
export const getTotalAmountCart = (state) => getNumber(state, 'cart.clientCart.totalPrice', 0);
export const getTotalAmountCartFinal = (state) => getNumber(state, 'cart.clientCart.totalAll', 0);
export const getTotalItemsCart = (state) => getNumber(state, 'cart.clientCart.totalItem', 0);
export const getCart = (state) => getObject(state[cartPath], 'clientCart') || {};
export const getFakeCart = (state) => getObject(state[cartPath], 'fakeCart') || {};
export const getTotalAmountFakeCart = (state) => getNumber(state, 'cart.fakeCart.totalPrice', 0);
export const getTotalItemsFakeCart = (state) => getNumber(state, 'cart.fakeCart.totalItem', 0);
export const getSelectCart = (state) => getObject(state[cartPath], 'selectedCart') || {};

export const getCarts = (state) => {
  return {
    clientCart: getObject(state[cartPath], 'clientCart') || {},
    isAskMergeCart: getBool(state[cartPath], 'isAskMergeCart') || false
  };
};

export const getFakeCarts = (state) => {
  return {
    fakeCart: getObject(state[cartPath], 'fakeCart') || {}
  };
};
export const getSelectedCarts = (state) => {
  return {
    selectedCart: getObject(state[cartPath], 'selectedCart') || {}
  };
};
export const getLoadingCart = (state) => {
  return state.cart.loadingCart;
};
export const getCartItems = (state) => {
  return state.cart.clientCart.cartItems;
};
export const getStoreReview = (state) => {
  return state.cart.clientCart.store;
};
export const getFakeCartItems = (state) => {
  return state.cart.fakeCart.cartItems;
};

export const getSelectedCartItems = (state) => {
  return state.cart.selectedCart.cartItems;
};
