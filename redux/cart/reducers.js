import * as types from './types';
import produce from 'immer';
import {
  // favorite
  addToFavorite,
  removeToFavorite,

  // cart
  addProduct,
  changeProductQuantity,
  removeProduct,
  changeShippingOption,
  changeShippingType,
  changePaymentMethod,
  changeStoreOption,
  changePromotionStoreOption,
  changeCoupons,
  clearCoupons,
  changeMyOrderResponse
} from '~/views/utils/helpers/cartActions';
import { mapDataCartServer } from '~/views/utils/helpers/mapData';
import { LOGOUT } from '../authUser/types';
import _ from 'lodash';

const defaultCart = {
  cartItems: [],
  idempotencyKey: undefined,
  totalItem: undefined,
  totalPrice: undefined,
  shippingOptionId: undefined,
  shippingType: undefined,
  chooseStore: {},
  promotionStore: {},
  coupon: [],
  myOrderResponse: undefined,
  totalAll: 0
};
const defaultFakeCart = {
  cartItems: [],
  totalItem: undefined,
  totalPrice: undefined
};
const defaultSelectedCart = {
  cartItems: [],
  totalItem: undefined,
  totalPrice: undefined
};
const initState = {
  // favorite
  favoriteProducts: [],

  // cart
  loadingCart: false,
  addresses: undefined,
  clientCart: defaultCart,
  criterionSearch: [],
  fakeCart: defaultFakeCart,
  fakeProductRecentAdded: {},
  selectedCart: defaultSelectedCart,
  selectedProductRecentAdded: {},
  previousProduct: undefined,
  productRecentAdded: {}
};

const reducer = produce((draft, { type, payload }) => {
  switch (type) {
    // favorite
    case types.ADD_TO_FAVORITE:
      draft.favoriteProducts = addToFavorite(draft.favoriteProducts, payload);
      return;
    case types.REMOVE_TO_FAVORITE:
      draft.favoriteProducts = removeToFavorite(draft.favoriteProducts, payload);
      return;

    // cart
    case types.GET_ADDRESSES_SUCCESS:
      draft.addresses = payload;
      return;
    case types.UPDATE_NEW_ITEM_ADD:
      draft.productRecentAdded = payload;
      draft.clientCart = addProduct(draft.clientCart, payload);
      draft.notify = true;
      draft.loadingCart = false;
      return;
    case types.FAKE_UPDATE_NEW_ITEM_ADD:
      draft.fakeProductRecentAdded = payload;
      draft.fakeCart = addProduct(draft.fakeCart, payload);
      draft.notify = true;
      return;
    case types.SELECTED_UPDATE_NEW_ITEM_ADD:
      draft.selectedProductRecentAdded = payload;
      draft.selectedCart = addProduct(draft.selectedCart, payload);
      draft.notify = true;
      return;
    case types.ADD_TO_CART:
      draft.productRecentAdded = payload;
      draft.clientCart = addProduct(draft.clientCart, payload);
      draft.notify = true;
      draft.loadingCart = false;
      return;
    case types.FAKE_ADD_TO_CART:
      draft.fakeProductRecentAdded = payload;
      draft.fakeCart = addProduct(draft.fakeCart, payload);
      draft.notify = true;
      return;
    case types.SELECTED_ADD_TO_CART:
      draft.selectedProductRecentAdded = payload;
      draft.selectedCart = addProduct(draft.selectedCart, payload);
      draft.notify = true;
      return;
    case types.REMOVE_ITEM_CART:
      draft.clientCart = removeProduct(draft.clientCart, payload.product);
      return;
    case types.REMOVE_ITEM_FAKE_CART:
      draft.fakeCart = removeProduct(draft.fakeCart, payload.product);
      return;
    case types.SELECTED_REMOVE_ITEM_CART:
      draft.selectedCart = removeProduct(draft.selectedCart, payload.product);
      return;
    case types.CHANGE_QUANTITY:
      draft.clientCart = changeProductQuantity(draft.clientCart, payload.product, payload.qty);
      return;
    case types.CHANGE_SHIPPING_OPTION:
      draft.clientCart = changeShippingOption(draft.clientCart, payload.shippingOptionId);
      return;
    case types.CHANGE_SHIPPING_TYPE:
      draft.clientCart = changeShippingType(draft.clientCart, payload.shippingType);
      return;
    case types.CHANGE_STORE_OPTION:
      draft.clientCart = changeStoreOption(draft.clientCart, payload.store);
      return;
    case types.CHANGE_PROMOTION_STORE_OPTION:
      draft.clientCart = changePromotionStoreOption(draft.clientCart, payload.promotionStore);
      return;
    case types.CHANGE_COUPON:
      draft.clientCart = changeCoupons(draft.clientCart, payload.coupon);
      return;
    case types.CLEAR_COUPON:
      draft.clientCart = clearCoupons(draft.clientCart);
      return;
    case types.CHANGE_PAYMENT_METHOD:
      draft.clientCart = changePaymentMethod(draft.clientCart, payload.paymentMethod);
      return;
    case types.CHANGE_MY_ORDER_SUCCESS:
      draft.clientCart = changeMyOrderResponse(draft.clientCart, payload.myOrderResponse);
      return;
    case types.CLEAR_CART:
      draft.clientCart = defaultCart;
      return;
    case types.LOADING_CART:
      draft.loadingCart = payload;
      return;
    case types.CLEAR_FAKE_CART:
      draft.fakeCart = defaultFakeCart;
      return;
    case types.CLEAR_SELECTED_CART:
      draft.selectedCart = defaultSelectedCart;
      return;
    case types.SET_AMOUNT_CART:
      draft.clientCart.totalAll = payload.amount;
    default:
      return draft;
  }
}, initState);

export default reducer;
