import { firstImage, getArray, getNumber, getObject, getString } from './utilObject';
import { cartActions } from '~/redux/cart/index';
import _ from 'lodash';
import { getPriceOfProductCartItem } from './mapData';
import { showToastError } from '~/configs/serverErrors';
import { COUPON_TYPE, PROMOTION_DISCOUNT_TYPE, PROMOTION_TYPE } from '~/configs/status';
import { PRODUCT_TYPE } from '~/configs/';

//favorite
export function addToFavorite(favoriteProductsStored, productId) {
  favoriteProductsStored.push(productId);
  return favoriteProductsStored;
}
export function removeToFavorite(favoriteProductsStored, productId) {
  return _.filter(favoriteProductsStored, (o) => +o !== +productId);
}

// cart
export function changeMyOrderResponse(itemsStored, myOrderResponse) {
  itemsStored.myOrderResponse = myOrderResponse;
  return itemsStored;
}

export function productToProductCart(prod, qty, shippingOptions, paymentMethods, type) {
  let productTradingId = undefined;
  let unitPrice = getNumber(prod, 'salePrice', 0) === 0 ? getNumber(prod, 'originalPrice', 0) : getNumber(prod, 'salePrice', 0);

  if (type === PRODUCT_TYPE.COMBO || type === PRODUCT_TYPE.TRADING) {
    unitPrice = prod.unitPrice
      ? prod.unitPrice
      : getNumber(prod, 'price', 0)
      ? getNumber(prod, 'price', 0)
      : getNumber(prod, 'originalPrice', 0);
  } else {
    unitPrice = prod.unitPrice
      ? prod.unitPrice
      : getNumber(prod, 'salePrice', 0)
      ? getNumber(prod, 'salePrice', 0)
      : getNumber(prod, 'originalPrice', 0);
  }

  let unitPriceTrue = unitPrice;
  // promotion discount  check price promotion if have store
  if (Object.keys(getObject(prod, 'store', {})).length !== 0) {
    const promotionType =
      Object.keys(getObject(prod, 'existedPromotion', {})).length !== 0
        ? getString(prod, 'existedPromotion.promotionType')
        : getString(prod, 'store.promotionType');
    const discount =
      Object.keys(getObject(prod, 'existedPromotion', {})).length !== 0
        ? _.head(getArray(prod, 'existedPromotion.promotionDiscounts', []))
        : _.head(getArray(prod, 'store.promotionDiscounts', []));
    if (discount && promotionType === PROMOTION_TYPE.DISCOUNT_PER_PRODUCT) {
      if (
        getString(discount, 'discountType') === PROMOTION_DISCOUNT_TYPE.MONEY ||
        getString(discount, 'type') === PROMOTION_DISCOUNT_TYPE.MONEY
      )
        unitPriceTrue = unitPrice - getNumber(discount, 'value', getNumber(discount, 'discountValue', 0));
      if (
        getString(discount, 'discountType') === PROMOTION_DISCOUNT_TYPE.PERCENT ||
        getString(discount, 'type') === PROMOTION_DISCOUNT_TYPE.PERCENT
      )
        unitPriceTrue = unitPrice - unitPrice * getNumber(discount, 'value', getNumber(discount, 'discountValue', 0)) * 0.01;
    }
  }

  productTradingId = getNumber(prod, 'productTradingId')
    ? getNumber(prod, 'productTradingId')
    : getNumber(prod, 'productId')
    ? getNumber(prod, 'id')
    : !getNumber(prod, 'productId') && !getNumber(prod, 'productTradingId')
    ? getNumber(prod, 'id')
    : undefined;

  return {
    ...prod,
    productId: getNumber(prod, 'productId')
      ? getNumber(prod, 'productId')
      : getNumber(prod, 'productTradingId')
      ? getNumber(prod, 'id')
      : getNumber(prod, 'id'),
    productTradingId,
    store: getObject(prod, 'store'),
    storeId: getNumber(prod, 'storeId', 0), // Chỗ này default là 0 để các sản phẩm chưa biết rõ stoe là fid thì sẽ hđược thêm vòa store là 0
    quantity: qty || 0,
    unitPrice: unitPriceTrue,
    name: getString(prod, 'name'),
    unitName: getString(prod, 'unit.name', ''),
    image: firstImage(getString(prod, 'images')),
    brandName: getString(prod, 'brandName.name'),
    shippingOptionId: getNumber(_.head(shippingOptions), 'value'),
    shippingAddressId: getNumber(_.head(shippingOptions), 'value'),
    paymentMethod: getString(_.head(paymentMethods), 'value')
  };
}

function checkSameProduct(item, product) {
  return getNumber(item, 'productId') == getNumber(product, 'productId') && getNumber(item, 'storeId') == getNumber(product, 'storeId');
}
export function changeShippingOption(itemsStored, shippingOptionId) {
  itemsStored.shippingOptionId = shippingOptionId;
  return itemsStored;
}
export function changeShippingType(itemsStored, shippingType) {
  itemsStored.shippingType = shippingType;
  return itemsStored;
}
export function changeStoreOption(itemsStored, store) {
  itemsStored.store = store;
  return itemsStored;
}
export function changePromotionStoreOption(itemsStored, promotionStore) {
  itemsStored.promotionStore = promotionStore;
  return itemsStored;
}

export function clearCoupons(itemsStored) {
  itemsStored.coupon = [];
  return itemsStored;
}
export function changeCoupons(itemsStored, coupon) {
  let coupons = _.compact(getArray(itemsStored, 'coupon', []));
  const indexCp = _.findIndex(itemsStored.coupon, (cp) => getNumber(cp, 'storeId') === getNumber(coupon, 'storeId'));
  if (indexCp !== -1) {
    if (getString(coupon, 'coupon', '') === '') coupons = _.filter((cp) => getNumber(cp, 'storeId') !== getNumber(coupon, 'storeId'));
    else coupons[indexCp] = coupon;
    itemsStored.coupon = coupons;
  } else {
    if (Object.keys(coupon).length <= 1) coupons = _.filter((cp) => getNumber(cp, 'storeId') !== getNumber(coupon, 'storeId'));
    else coupons.push(coupon);
    itemsStored.coupon = getArray(coupons, undefined, []);
  }
  return itemsStored;
}
export function changePaymentMethod(itemsStored, paymentMethod) {
  const cartItems = getArray(itemsStored, 'cartItems', []);
  const cartItemsTrue = cartItems.map((v) => {
    return {
      ...v,
      paymentMethod
    };
  });
  itemsStored.cartItems = cartItemsTrue;
  return itemsStored;
}

export function changeProductQuantity(itemsStored, product, quantity) {
  let cartItems = getArray(itemsStored, 'cartItems') || [];
  let existObject = cartItems.find((item) => getNumber(item, 'storeId') === getNumber(product, 'storeId'));
  if (existObject) {
    let products = getArray(existObject, 'orderDetails') || [];
    let existProduct = products.find((item) => checkSameProduct(item, product));
    if (existProduct) {
      // /**
      //  * tan.hoang@vslsoft.com : need change pricingRangeId when quantity changed
      //  */
      // let pricingRanges = getArray(existProduct, 'pricingRanges', []);

      // const pricingRangesSortReverse = _.reverse(_.sortBy(pricingRanges, ['fromValue']));
      // const priceItem = _.find(pricingRangesSortReverse, (o) => parseInt(quantity) >= parseInt(o.fromValue));
      // let pricingRangeId = getNumber(priceItem, 'id');
      // existProduct.pricingRangeId = pricingRangeId;

      existProduct.quantity = quantity;
      // let priceNew = getPriceOfProductCartItem(product, existProduct.quantity);
      // existProduct.unitPrice = priceNew;
      existProduct.subTotal = existProduct.quantity * existProduct.unitPrice;
    }
    existObject.amount = _.sum(getArray(existObject, 'orderDetails', []).map((item) => getNumber(item, 'subTotal', 1)));
    itemsStored.totalPrice = sumTotalPrice(cartItems);
    itemsStored.totalItem = sumTotalItem(cartItems);
  }

  return itemsStored;
}

export function removeProduct(itemsStored, product) {
  let cartItems = getArray(itemsStored, 'cartItems') || [];

  /**
   * tan.hoang@vslsoft.com: Thay đổi cách xóa product chứ không phải xóa cả distributor như trước
   */
  let newCartItem = getArray(cartItems, undefined, []).map((group) => {
    if (getNumber(group, 'storeId') === getNumber(product, 'storeId'))
      return {
        ...group,
        orderDetails: getArray(group, 'orderDetails', []).filter(
          (item) => getNumber(product, 'productId', 0) !== getNumber(item, 'productId', 0)
        )
      };
    else return group;
  });
  // let existObject = newCartItem.find((item) => getNumber(item, "storeId") === getNumber(product, "storeId"));
  // existObject.amount = _.sum(getArray(existObject, "orderDetails", []).map((item) => getNumber(item, "subTotal", 1)));

  const newCartItemFilter = newCartItem.filter((item) => getArray(item, 'orderDetails', []).length !== 0);
  // item.storeId != product.storeId && getArray(item, "orderDetails", []).length !== 0

  itemsStored.cartItems = newCartItemFilter;
  itemsStored.totalItem = sumTotalItem(newCartItem);
  itemsStored.totalPrice = sumTotalPrice(newCartItem);

  return itemsStored;
}

export function addProduct(itemsStored, product) {
  let cartItems = getArray(itemsStored, 'cartItems') || [];

  let existObject = cartItems.find((item) => getNumber(item, 'storeId') === getNumber(product, 'storeId'));

  if (existObject) {
    let products = getArray(existObject, 'orderDetails', []);
    let exitsProduct = products.find((item) => checkSameProduct(item, product));
    if (exitsProduct) {
      exitsProduct.productTradingId = getNumber(product, 'productTradingId');
      exitsProduct.unitPrice = getNumber(product, 'unitPrice');
      exitsProduct.storeHavePromotion = getObject(product, 'storeHavePromotion');
      exitsProduct.store = getObject(product, 'storeHavePromotion');
      exitsProduct.quantity = exitsProduct.quantity + product.quantity;
      exitsProduct.subTotal = exitsProduct.quantity * exitsProduct.unitPrice;
      existObject.amount = _.sum(getArray(existObject, 'orderDetails', []).map((item) => item.subTotal || 0));
    } else {
      products.push({
        ...product,
        subTotal: product.quantity * getNumber(product, 'unitPrice') || 0
      });
      existObject.amount = _.sum(getArray(existObject, 'orderDetails', []).map((item) => item.subTotal || 0));
    }
  } else {
    cartItems.push({
      storeId: getNumber(product, 'storeId', 0),
      distributorName: getString(product, 'distributorName', ''),
      amount: product.quantity * getNumber(product, 'unitPrice'),
      shippingOptionId: getNumber(product, 'shippingOptionId', 0),
      shippingType: getString(product, 'shippingType'),
      paymentMethod: getString(product, 'paymentMethod'),
      orderDetails: [
        {
          ...product,
          subTotal: product.quantity * getNumber(product, 'unitPrice') || 0
        }
      ]
    });
  }

  return {
    cartItems: cartItems,
    totalPrice: sumTotalPrice(cartItems),
    totalItem: sumTotalItem(cartItems)
  };
}

function sumTotalItem(itemsStored) {
  let cartItems = getArray(itemsStored || []);
  let items = cartItems.map((it) => _.sum((getArray(it, 'orderDetails') || []).map((item) => item.quantity || 0)));
  let quantity = _.sum(items);
  return quantity;
}

function sumTotalPrice(itemsStored) {
  let cartItems = getArray(itemsStored || []);
  let items = cartItems.map((it) => _.sum((getArray(it, 'orderDetails') || []).map((item) => item.subTotal || 0)));
  let subTotal = _.sum(items);
  return subTotal;
}

export function mergeStores(stores) {
  for (let i = 0; i < stores.length; i++) {
    const elementI = stores[i];
    for (let j = i + 1; j < stores.length - 1; j++) {
      const elementJ = stores[j];
      if (getNumber(elementI, 'store.id', -1) === getNumber(elementJ, 'store.id', -2)) {
        stores[i] = _.merge(elementI, elementJ);
      }
    }
  }
  return _.unionBy(stores, (store) => {
    return getNumber(store, 'store.id', false);
  });
}
