import React from 'react';
import _ from 'lodash';
import { getArray, getNumber } from './utilObject';
import { APP_DEFAULT_PATH } from '~/configs/routesConfig';
import { getAlias } from './string';
import { PRODUCT_EVENTS } from '~/configs';
import { parseCurrency } from '~/views/utils/helpers';

export function mapImageSize(images, size = 70, sizeY = 0) {
  // sizeY !== 70 ? sizeY = sizeY : sizeY = size;

  let imgURL = (images || '').split('|').find(_, (idx) => idx === 0);
  let indexOfDot = imgURL.lastIndexOf('.');
  let resizeImgURL = '';
  if (indexOfDot >= 0) {
    let imgName = imgURL.substr(0, indexOfDot);
    let imgExtension = imgURL.substr(indexOfDot + 1);
    resizeImgURL = `${imgName}_${size}x${sizeY}.${imgExtension}`;
  }
  return resizeImgURL;
}

export function mapDataCartServer(serverCart) {
  var cartItems = getArray(serverCart, 'cartItems') || [];
  cartItems = cartItems.map((productsVendor) => {
    return {
      ...productsVendor,
      products: (getArray(productsVendor, 'products') || []).map((product) => {
        return {
          ...product,
          vendorId: getNumber(productsVendor, 'vendorId') || -1,
          cartItemId: getNumber(product, 'id')
        };
      })
    };
  });

  let result = { ...serverCart, cartItems: cartItems };
  //
  return result;
}

export function getPriceOfProductCartItem(product, quantity) {
  // tan.hoang@vslsoft.com: calculator price or sale price
  /**
   * setPriceOption on change set price
   */
  // const pricingRanges = getArray(product, 'pricingRanges', []);
  // // sort and reverse array
  // const pricingRangesSortReverse = _.reverse(_.sortBy(pricingRanges, ['fromValue']));
  // // find item price true
  // const priceItem = _.find(pricingRangesSortReverse, (o) => parseInt(quantity) >= parseInt(o.fromValue));

  // const salePrice = getNumber(priceItem, 'salePrice', 0);
  // const priceTrue = getNumber(priceItem, 'price', 0);

  const salePrice = getNumber(product, 'salePrice', 0);
  const originalPrice = getNumber(product, 'originalPrice', 0);

  return salePrice === 0 ? originalPrice : salePrice;
}

export function getDiffPriceAndPriceNew(product) {
  let unitPriceNew = getNumber(product, 'unitPriceNew') || 0;
  let unitPrice = getNumber(product, 'unitPrice') || 0;
  return Math.abs(unitPriceNew - unitPrice);
}

export function getWarningCart(products) {
  let hasIssue = false;
  var warnings = [];
  (products || []).map((item) => {
    const { productEvent, quantity, quantityInStock, name, productId, vendorId } = item;
    let className = 'text-danger li-a';

    let itemWarning = (productEvent || '').split('|').map((eventName) => {
      switch (eventName) {
        case PRODUCT_EVENTS.OUT_OF_STOCK: {
          hasIssue = true;
          return (
            <a href={`${APP_DEFAULT_PATH}${getAlias(name)}?id=${productId}&vendorId=${vendorId}`}>
              <p className="name">
                {
                  <span className={className}>
                    Mặt hàng <span className="product-a">{name}</span> đã hết hàng{' '}
                  </span>
                }
              </p>
            </a>
          );
        }
        case PRODUCT_EVENTS.NONE: {
          if (quantity > quantityInStock) {
            hasIssue = true;
            return (
              <a href={`${APP_DEFAULT_PATH}${getAlias(name)}?id=${productId}&vendorId=${vendorId}`}>
                <p className="name">
                  {
                    <span className={className}>
                      Mặt hàng <span className="product-a">{name}</span> {`chỉ còn ${quantityInStock} sản phẩm`}{' '}
                    </span>
                  }
                </p>
              </a>
            );
          } else {
            return undefined;
          }
        }
        case PRODUCT_EVENTS.PRICE_IN: {
          let unitPrice = getNumber(item, 'unitPrice') || 0;
          let unitPriceNew = getNumber(item, 'unitPriceNew') || 0;
          return (
            <a href={`${APP_DEFAULT_PATH}${getAlias(name)}?id=${productId}&vendorId=${vendorId}`}>
              <p className="name">
                {
                  <span className={className}>
                    Giá của mặt hàng <span className="product-a">{name}</span>{' '}
                    {`đã tăng từ ${parseCurrency(unitPrice)} lên ${parseCurrency(
                      unitPriceNew
                    )} kể từ lúc được thêm vào giỏ hàng. Giá của các mặt hàng trong giỏ hàng là giá được cập nhật mới nhất`}{' '}
                  </span>
                }
              </p>
            </a>
          );
        }
        case PRODUCT_EVENTS.PRICE_DE: {
          let unitPrice = getNumber(item, 'unitPrice') || 0;
          let unitPriceNew = getNumber(item, 'unitPriceNew') || 0;
          return (
            <a href={`${APP_DEFAULT_PATH}${getAlias(name)}?id=${productId}&vendorId=${vendorId}`}>
              <p className="name">
                {
                  <span className={className}>
                    Giá của mặt hàng <span className="product-a">{name}</span>{' '}
                    {`đã giảm từ ${parseCurrency(unitPrice)} xuống ${parseCurrency(
                      unitPriceNew
                    )} kể từ lúc được thêm vào giỏ hàng. Giá của các mặt hàng trong giỏ hàng là giá được cập nhật mới nhất`}{' '}
                  </span>
                }
              </p>
            </a>
          );
        }
        case PRODUCT_EVENTS.NOT_ENOUGH_PRODUCT: {
          hasIssue = true;
          return (
            <a href={`${APP_DEFAULT_PATH}${getAlias(name)}?id=${productId}&vendorId=${vendorId}`}>
              <p className="name">
                {
                  <span className={className}>
                    Mặt hàng <span className="product-a">{name}</span> {`chỉ còn ${quantityInStock} sản phẩm`}{' '}
                  </span>
                }
              </p>
            </a>
          );
        }
        case (PRODUCT_EVENTS.PRODUCT_DELETED,
        PRODUCT_EVENTS.PRODUCT_INACTIVE,
        PRODUCT_EVENTS.VARIATION_DELETED,
        PRODUCT_EVENTS.INVENTORY_DISABLE,
        PRODUCT_EVENTS.INVENTORY_OUT_OF,
        PRODUCT_EVENTS.INVENTORY_NOT_SUFFICIENT,
        PRODUCT_EVENTS.INVENTORY_NOT_FOUND,
        PRODUCT_EVENTS.PRODUCT_INACTIVE,
        PRODUCT_EVENTS.VENDOR_INACTIVE): {
          hasIssue = true;
          return (
            <a href={`${APP_DEFAULT_PATH}${getAlias(name)}?id=${productId}&vendorId=${vendorId}`}>
              <p className="name">
                {
                  <span className={className}>
                    Mặt hàng <span className="product-a">{name}</span> {`ngừng kinh doanh`}{' '}
                  </span>
                }
              </p>
            </a>
          );
        }
        default:
          return undefined;
      }
    });
    warnings = _.concat(warnings, itemWarning);
  });

  return {
    warnings: warnings.filter((item) => item !== undefined),
    hasIssue: hasIssue
  };
}
