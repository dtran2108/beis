import * as types from './types';
import apiAction, { defaultAction } from '~/redux/utils/createAction';
import _ from 'lodash';
import { parseObjToQuery } from '~/utils/helpers';

// FAVORITE
export const addFavoriteClient = (productId) => defaultAction(types.ADD_TO_FAVORITE, productId);
export const removeFavoriteClient = (productId) => defaultAction(types.REMOVE_TO_FAVORITE, productId);

// CART
export const addToCart = (itemCart) => ({
  type: types.ADD_TO_CART,
  payload: itemCart
});
export const addToFakeCart = (itemCart) => ({
  type: types.FAKE_ADD_TO_CART,
  payload: itemCart
});
export const addToSelectedCart = (itemCart) => ({
  type: types.SELECTED_ADD_TO_CART,
  payload: itemCart
});
export const removeItemCart = (product) => ({
  type: types.REMOVE_ITEM_CART,
  payload: { product }
});
export const removeItemFakeCart = (product) => ({
  type: types.REMOVE_ITEM_FAKE_CART,
  payload: { product }
});
export const removeItemSelectedCart = (product) => ({
  type: types.SELECTED_REMOVE_ITEM_CART,
  payload: { product }
});
export const setLoadingCart = (isLoading) => ({
  type: types.LOADING_CART,
  payload: isLoading
});

export const clearCart = () => ({
  type: types.CLEAR_CART
});
export const clearFakeCart = () => ({
  type: types.CLEAR_FAKE_CART
});
export const clearSelectedCart = () => ({
  type: types.CLEAR_SELECTED_CART
});

export const setAmountCart = (amount) => ({
  type: types.SET_AMOUNT_CART,
  payload: { amount }
});

export const changeQuantity = (product, qty) => ({
  type: types.CHANGE_QUANTITY,
  payload: { product, qty }
});
export const changeShippingOption = (shippingOptionId) => ({
  type: types.CHANGE_SHIPPING_OPTION,
  payload: { shippingOptionId }
});
export const changeShippingType = (shippingType) => ({
  type: types.CHANGE_SHIPPING_TYPE,
  payload: { shippingType }
});
export const changeStoreOption = (store) => ({
  type: types.CHANGE_STORE_OPTION,
  payload: { store }
});
export const changePromotionStoreOption = (promotionStore) => ({
  type: types.CHANGE_PROMOTION_STORE_OPTION,
  payload: { promotionStore }
});
export const changeCoupons = (coupon) => ({
  type: types.CHANGE_COUPON,
  payload: { coupon }
});
export const clearCoupons = () => ({
  type: types.CLEAR_COUPON
});
export const changePaymentMethod = (paymentMethod) => ({
  type: types.CHANGE_PAYMENT_METHOD,
  payload: { paymentMethod }
});
export const updateNewItemAdd = (body) => defaultAction(types.UPDATE_NEW_ITEM_ADD, body);
export const updateNewItemAddFake = (body) => defaultAction(types.FAKE_UPDATE_NEW_ITEM_ADD, body);
export const updateNewItemAddSelected = (body) => defaultAction(types.SELECTED_UPDATE_NEW_ITEM_ADD, body);

export const changeMyOrderSuccess = (myOrderResponse) => ({
  type: types.CHANGE_MY_ORDER_SUCCESS,
  payload: { myOrderResponse }
});

// flow order:
// 53
export const checkProductsHavePromotion = (body, ctx) =>
  apiAction('post')(types.CHECK_PRODUCTS_HAVE_PROMOTION, `consumer/products/store/promotion/check`, body, true, true, ctx);

// 52
export const loadPromotionOfStoreWithProduct = (productId, params, ctx) =>
  apiAction('get')(
    types.LOAD_PROMOTION_OF_STORE_WITH_PRODUCT,
    `consumer/product-trading/promotions/of-product/${productId}` + parseObjToQuery(params),
    {},
    true,
    true,
    ctx
  );

//  51
export const loadDeliverPartner = (params, ctx) =>
  apiAction('get')(types.LOAD_DELIVER_PARTNER, `delivery-partner` + parseObjToQuery(params), {}, true, true, ctx);

// new cart gt-link
export const loadStoreInfo = (body, params, ctx) =>
  apiAction('post')(types.LOAD_STORE_INFO, `consumer/myorder/test` + parseObjToQuery(params), body, true, true, ctx);

// create order:
export const createOrder = (body, ctx) => apiAction('post')(types.CREATE_ODER, `consumer/myorder`, body, true, true, ctx);

export const checkCouponOrder = (coupon, storeId, ctx) =>
  apiAction('get')(types.CHECK_ORDER_COUPON, `coupons/${coupon}/${storeId}`, {}, true, true, ctx);

export const resendCode = (ctx) => apiAction('post')(types.CHECK_ORDER_COUPON, `wallet/api/v1/otps/resend`, {}, true, true, ctx);

export const verifyCode = (body, ctx) => apiAction('post')(types.CHECK_ORDER_COUPON, `wallet/api/v1/otps/validate`, body, true, true, ctx);

export const initCode = (ctx) => apiAction('post')(types.CHECK_ORDER_COUPON, `wallet/api/v1/otps/init`, {}, true, true, ctx);

export const paymentWithEWallet = (body, ctx) =>
  apiAction('post')(types.PAYMENT_WITH_E_WALLET, `consumer/myorder/payment`, body, true, true, ctx);

// WISH LIST

export const getWishList = (params, ctx) =>
  apiAction('get')(types.WISHLIST_LIST, `wishlists` + parseObjToQuery(params), {}, true, true, ctx);
export const addWishItem = (body, ctx) => apiAction('post')(types.WISHLIST_ADD, `wishlists/add`, body, true, true, ctx);
export const removeWishItem = (id, ctx) => apiAction('delete')(types.WISHLIST_REMOVE, `wishlists/${id}`, {}, true, true, ctx);
