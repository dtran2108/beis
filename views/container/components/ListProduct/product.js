import { CheckOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Col, Typography } from 'antd';
import _ from 'lodash';
import Link from 'next/link';
import { UIButton } from '~/views/presentation/ui/buttons';
// compose
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import styled from 'styled-components';
import SaleTag from '~/assets/icons/sale-tag.svg';
import ShoppingIcon from '~/assets/icons/shopping-cart.svg';
import { FALL_BACK } from '~/configs/constants';
import { PRODUCT_TYPE } from '~/configs/index';
import { PRODUCT_DETAIL_PATH, PROMOTION_DETAIL_PATH } from '~/configs/routesConfig';
import { showToastError } from '~/configs/serverErrors';
import { authSelectors } from '~/redux/authUser/index';
import { cartSelectors } from '~/redux/cart';
import * as cartActions from '~/redux/cart/actions';
import * as homeActions from '~/redux/home/index';
import UIImageView from '~/views/presentation/ui/Image/UIImageView';
import { parseCurrency } from '~/views/utils/helpers/index';
import { firstImage, getArray, getBool, getNumber, getObject, getString } from '~/views/utils/helpers/utilObject';
import COLOR from '~/views/utils/layout/color';
import { UIImage } from '~/presentation/ui/Image';
import { ICONS } from '~/configs/icons';
import { productToProductCart } from '~/utils/helpers/cartActions';

const WrapProductItem = styled(Col)`
  .wrap_product {
    border: 1px solid rgba(226, 221, 221, 0.53);
    border-radius: 10pt;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    padding: 20px 12px 20px;
    .title {
      min-height: 48px !important;
      :hover {
        a {
          color: ${COLOR.priceText};
        }
      }
    }
    .title,
    a,
    .price {
      color: ${COLOR.boldText};
      font-size: 1rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    .price {
      color: ${COLOR.priceText};
    }
  }

  .ant-typography-ellipsis-single-line {
    width: 100%;
  }
  .wrap_image {
    position: relative;
    transition: all 0.4s 0.1s ease;
  }

  .check-product {
    position: absolute;
    z-index: 1;
    left: -12px;
    top: 50%;
    height: 40px;
    width: calc(100% + 24px);
    background: ${COLOR.gradientButton};
  }

  .shop_cart,
  .favorite,
  .sale_tag,
  .non_favorite {
    color: ${COLOR.primary};
    z-index: 1;
    top: 0;
    position: absolute;
    font-size: 21px;
    :hover:not(.sale_tag) {
      cursor: pointer;
      font-size: 26px;
      transition: font-size 0.1s ease-in;
    }
  }
  .shop_cart {
    left: 5px;
    font-size: 25px;
  }

  .sale_tag {
    right: 10px;
    font-size: 35px;
    transform: rotate(45deg);
  }
  .shop_cart_active {
    color: ${COLOR.success};
  }

  .favorite {
    top: unset;
    bottom: 0;
    right: 0;
  }
  .non_favorite {
    top: unset;
    bottom: 0;
    right: 0;
  }

  .shop_cart:focus {
    // animation: animationShopCartFrames ease 0.25s;
    // animation-iteration-count: 1;
    // transform-origin: 50% 50%;
    // -webkit-animation: animationShopCartFrames ease 0.25s;
    // -webkit-animation-iteration-count: 1;
    // -webkit-transform-origin: 50% 50%;
    // -moz-animation: animationShopCartFrames ease 0.25s;
    // -moz-animation-iteration-count: 1;
    // -moz-transform-origin: 50% 50%;
    // -o-animation: animationShopCartFrames ease 0.25s;
    // -o-animation-iteration-count: 1;
    // -o-transform-origin: 50% 50%;
    // -ms-animation: animationShopCartFrames ease 0.25s;
    // -ms-animation-iteration-count: 1;
    // -ms-transform-origin: 50% 50%;
  }

  @keyframes animationShopCartFrames {
    0% {
      transform: translate(0px, 0px);
      -webkit-transform: translate(0px, 0px);
      -moz-transform: translate(0px, 0px);
      -ms-transform: translate(0px, 0px);
      -o-transform: translate(0px, 0px);
    }
    15% {
      transform: translate(0px, -20px);
      -webkit-transform: translate(0px, -20px);
      -moz-transform: translate(0px, -20px);
      -ms-transform: translate(0px, -20px);
      -o-transform: translate(0px, -20px);
    }
    30% {
      transform: translate(0px, 0px);
      -webkit-transform: translate(0px, 0px);
      -moz-transform: translate(0px, 0px);
      -ms-transform: translate(0px, 0px);
      -o-transform: translate(0px, 0px);
    }
    45% {
      transform: translate(0px, -10px);
      -webkit-transform: translate(0px, -10px);
      -moz-transform: translate(0px, -10px);
      -ms-transform: translate(0px, -10px);
      -o-transform: translate(0px, -10px);
    }
    60% {
      transform: translate(0px, 0px);
      -webkit-transform: translate(0px, 0px);
      -moz-transform: translate(0px, 0px);
      -ms-transform: translate(0px, 0px);
      -o-transform: translate(0px, 0px);
    }
    75% {
      transform: translate(0px, -5px);
      -webkit-transform: translate(0px, -5px);
      -moz-transform: translate(0px, -5px);
      -ms-transform: translate(0px, -5px);
      -o-transform: translate(0px, -5px);
    }
    100% {
      transform: translate(0px, 0px);
      -webkit-transform: translate(0px, 0px);
      -moz-transform: translate(0px, 0px);
      -ms-transform: translate(0px, 0px);
      -o-transform: translate(0px, 0px);
    }
  }
  .favorite-animation:focus {
    animation: animationFavoriteFrames linear 1s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;
    -webkit-animation: animationFavoriteFrames linear 1s;
    -webkit-animation-iteration-count: 1;
    -webkit-transform-origin: 50% 50%;
    -moz-animation: animationFavoriteFrames linear 1s;
    -moz-animation-iteration-count: 1;
    -moz-transform-origin: 50% 50%;
    -o-animation: animationFavoriteFrames linear 1s;
    -o-animation-iteration-count: 1;
    -o-transform-origin: 50% 50%;
    -ms-animation: animationFavoriteFrames linear 1s;
    -ms-animation-iteration-count: 1;
    -ms-transform-origin: 50% 50%;
  }

  @keyframes animationFavoriteFrames {
    0% {
      transform: rotate(0deg) scaleX(1) scaleY(1);
      -webkit-transform: rotate(0deg) scaleX(1) scaleY(1);
      -moz-transform: rotate(0deg) scaleX(1) scaleY(1);
      -ms-transform: rotate(0deg) scaleX(1) scaleY(1);
      -o-transform: rotate(0deg) scaleX(1) scaleY(1);
    }
    10% {
      transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -webkit-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -moz-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -ms-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -o-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    20% {
      transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -webkit-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -moz-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -ms-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
      -o-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    30% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    40% {
      transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    50% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    60% {
      transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    70% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    80% {
      transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    90% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    100% {
      transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
      -webkit-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
      -moz-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
      -ms-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
      -o-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
    }
  }
`;

const ProductItem = ({
  prod,
  isSale = false,
  isCombo = false,
  handleAddToCart,
  handleAddToSelectedCart,
  cartItems,
  selectedItems,
  handleAPIFavorite,
  handleRemoveSelectedCart,
  isAuthenticated,
  router,
  handleRemoveToCart,

  // favorite
  favoriteProducts
}) => {
  const [isFavorite, setIsFavorite] = useState(getBool(prod, 'isFavorite', false));
  useEffect(() => {
    if (_.includes(favoriteProducts, +prod.id)) setIsFavorite(true);
    else setIsFavorite(false);
  }, [favoriteProducts, prod.id]);

  const arrCartProduct = getArray(_.head(cartItems), 'orderDetails', []);
  const [isShop, setIsShop] = useState(_.find(arrCartProduct, (o) => +o.productId === +prod.id));
  useEffect(() => {
    if (_.find(arrCartProduct, (o) => +o.productId === +prod.id)) setIsShop(true);
    else setIsShop(false);
  }, [arrCartProduct.length, _.find(arrCartProduct, (o) => +o.productId === +prod.id)]);

  const arrSelectedProduct = getArray(_.head(selectedItems), 'orderDetails', []);
  const [isSelected, setIsSelected] = useState(_.find(arrSelectedProduct, (o) => +o.productId === +prod.id));
  useEffect(() => {
    if (_.find(arrSelectedProduct, (o) => +o.productId === +prod.id)) setIsSelected(true);
    else setIsSelected(false);
  }, [arrSelectedProduct.length, _.find(arrSelectedProduct, (o) => +o.productId === +prod.id)]);

  const handleFavorite = (id, isFavorite) => {
    setIsFavorite(isFavorite);
    handleAPIFavorite && handleAPIFavorite(id, isFavorite);
  };
  const handleAddShop = () => {
    setIsShop(true);
    handleAddToCart && handleAddToCart(prod, 1);
  };
  const handleRemoveCart = () => {
    setIsShop(false);
    handleRemoveToCart && handleRemoveToCart(prod);
  };
  const handleAddToChooseList = () => {
    !isSelected && handleAddToSelectedCart && handleAddToSelectedCart(prod, 1);
    isSelected && handleRemoveSelectedCart && handleRemoveSelectedCart(prod);
  };

  // console.log(`ithoangtan -  ~ file: product.js ~ line 471 ~   prod`, prod);
  // console.log(
  //   `ithoangtan -  ~ file: product.js ~ line 471 ~   isSale,
  // isCombo,`,
  //   isSale,
  //   isCombo
  // );

  return (
    <WrapProductItem className="gutter-row" span={12} md={8} lg={6} xl={6} xxl={6}>
      <div className="wrap_product text-center bg-white">
        <div className="wrap_image">
          {/* action buttons */}
          {isShop ? (
            <CheckOutlined className="shop_cart shop_cart_active" onClick={handleRemoveCart} />
          ) : (
            <ShoppingIcon className="shop_cart " onClick={handleAddShop} />
          )}
          {isSale && <SaleTag className="sale_tag" />}
          {/* {isFavorite && !isCombo && isAuthenticated ? (
            <HeartFilled className="favorite favorite-animation" onClick={() => handleFavorite(getNumber(prod, 'id'), false)} />
          ) : (
            !isCombo &&
            isAuthenticated && (
              <HeartOutlined className="non_favorite favorite-animation" onClick={() => handleFavorite(getNumber(prod, 'id'), true)} />
            )
          )} */}
          <UIImageView
            preview={false}
            style={{ borderRadius: 8, cursor: 'pointer' }}
            src={firstImage(getString(prod, 'images', ''))}
            fallback={FALL_BACK}
            onClick={handleAddToChooseList}
          />
          {isSelected && (
            <div
              className="check-product d-flex justify-content-center align-items-center"
              style={{ cursor: 'pointer' }}
              role="presentation"
              onClick={handleAddToChooseList}>
              <UIImage src={ICONS.check} width={28} />
            </div>
          )}
        </div>
        {getString(prod, 'name') && (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: false }} className="mt-4 title text-wrap">
            {(isCombo && (
              <Link
                href={{
                  pathname: PRODUCT_DETAIL_PATH.replace(
                    ':id',
                    getNumber(prod, 'productTradingId') ? getNumber(prod, 'productTradingId') : getNumber(prod, 'id')
                  ),
                  query: { type: PRODUCT_TYPE.TRADING }
                }}>
                {getString(prod, 'name', 'NO_NAME')}
              </Link>
            )) ||
              (isSale && (
                <Link
                  href={{
                    pathname: PRODUCT_DETAIL_PATH.replace(
                      ':id',
                      getNumber(prod, 'productTradingId')
                        ? getNumber(prod, 'productTradingId')
                        : getNumber(prod, 'productId')
                        ? getNumber(prod, 'id')
                        : getNumber(prod, 'id')
                    ),
                    query: {
                      type: getNumber(prod, 'productTradingId') || getNumber(prod, 'productId') ? PRODUCT_TYPE.TRADING : PRODUCT_TYPE.OTHER
                    }
                  }}>
                  {getString(prod, 'name', 'NO_NAME')}
                </Link>
              )) || (
                <Link
                  href={{
                    pathname: PRODUCT_DETAIL_PATH.replace(
                      ':id',
                      getNumber(prod, 'productTradingId')
                        ? getNumber(prod, 'productTradingId')
                        : getNumber(prod, 'productId')
                        ? getNumber(prod, 'id')
                        : getNumber(prod, 'id')
                    ),
                    query: {
                      type: getNumber(prod, 'productTradingId') || getNumber(prod, 'productId') ? PRODUCT_TYPE.TRADING : PRODUCT_TYPE.OTHER
                    }
                  }}>
                  {getString(prod, 'name', 'NO_NAME')}
                </Link>
              )}
          </Typography.Paragraph>
        )}

        {isCombo === false && (
          <Typography.Text className="price">
            {` ${parseCurrency(
              getNumber(prod, 'price', 0) === 0 ? getNumber(prod, 'originalPrice', '') : getNumber(prod, 'price', 0),
              'đ'
            )}`}
            {isCombo === false && `/ ${getString(prod, 'unit.name', '')}`}
          </Typography.Text>
        )}
        {isCombo && (
          <div>
            <Typography.Text className="price">{`${parseCurrency(getNumber(prod, 'price', 0), 'đ')} `}</Typography.Text>

            {getNumber(prod, 'originalPrice', 0) !== 0 && (
              <Typography.Text type="secondary" delete>{`${parseCurrency(getNumber(prod, 'originalPrice', 0), 'đ')}`}</Typography.Text>
            )}
          </div>
        )}
      </div>
      <div className="btn_view_detail mt-2 mb-4">
        {((!isCombo && isSale) || (!getBool(prod, 'isCombo', false) && isSale)) && (
          <UIButton
            className="w-100 mb-1"
            type="primary"
            onClick={() =>
              router.push({
                pathname: PROMOTION_DETAIL_PATH.replace(
                  ':id',
                  getNumber(prod, 'productId') ? getNumber(prod, 'productId') : getNumber(prod, 'id')
                ),
                query: {
                  distance: getNumber(prod, 'distance', 0),
                  storeId: getNumber(prod, 'productId') ? getNumber(prod, 'store.id') : undefined
                }
              })
            }>
            {'promotion_info'}
          </UIButton>
        )}
        {isCombo && getBool(prod, 'isCombo', false) && (
          <Link href={{ pathname: PRODUCT_DETAIL_PATH.replace(':id', getNumber(prod, 'id')), query: { type: PRODUCT_TYPE.TRADING } }}>
            <UIButton type="primary" className="w-100">
              {'view_detail'}
            </UIButton>
          </Link>
        )}
      </div>
    </WrapProductItem>
  );
};

export async function getStaticProps({ preview = null }) {
  return { props: { preview } };
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      authUser: authSelectors.getAuthUser(state),
      isAuthenticated: state['authUser'].isAuthenticated,

      cartAmountCounter: cartSelectors.getTotalAmountCart(state),
      cartItems: cartSelectors.getCartItems(state),
      loadingCart: cartSelectors.getLoadingCart(state),
      selectedItems: cartSelectors.getSelectedCartItems(state),

      // favorite
      favoriteProducts: cartSelectors.getFavoriteProducts(state)
    }),
    {
      addFavorite: homeActions.addFavorite,
      removeFavorite: homeActions.removeFavorite,

      addToCart: cartActions.addToCart,
      checkProductsHavePromotion: cartActions.checkProductsHavePromotion,
      clearCart: cartActions.clearCart,
      removeItemSelectedCart: cartActions.removeItemSelectedCart,
      removeItemCart: cartActions.removeItemCart,
      setLoadingCart: cartActions.setLoadingCart,
      updateNewItemAdd: cartActions.updateNewItemAdd,
      updateNewItemAddFake: cartActions.updateNewItemAddFake,
      updateNewItemAddSelected: cartActions.updateNewItemAddSelected,

      // favorite
      addFavoriteClient: cartActions.addFavoriteClient,
      removeFavoriteClient: cartActions.removeFavoriteClient
    }
  ),

  withState('qty', 'setQty', 1),
  withState('product', 'setProduct'),

  withState('shippingOptions', 'setShippingOptions', [{ value: 2 }]),
  withState('paymentMethods', 'setPaymentMethods', [{ value: 2 }]),

  withHandlers({
    handleAddToCart: (props) => (prod, qty) => {
      const { updateNewItemAdd, shippingOptions, paymentMethods, setLoadingCart, checkProductsHavePromotion } = props;

      setLoadingCart(true);

      let product = productToProductCart(prod, qty, shippingOptions, paymentMethods, PRODUCT_TYPE.TRADING);

      const promotionProductIds = [getNumber(prod, 'id')];
      checkProductsHavePromotion({ promotionProductIds })
        .then((res) => {
          setLoadingCart(false);
          updateNewItemAdd && updateNewItemAdd({ ...product, isPromotion: getArray(res, 'promotionProductIds', []).length !== 0 });
        })
        .catch((err) => {
          showToastError(err);
        });
    },
    handleRemoveToCart: (props) => (prod) => {
      const { shippingOptions, paymentMethods, removeItemCart } = props;
      let product = productToProductCart(prod, shippingOptions, paymentMethods);
      removeItemCart(product);
    },
    handleAddToSelectedCart: (props) => (prod, qty) => {
      const { updateNewItemAddSelected, shippingOptions, paymentMethods } = props;

      let product = productToProductCart(prod, qty, shippingOptions, paymentMethods, PRODUCT_TYPE.TRADING);

      updateNewItemAddSelected(product);
    },
    handleRemoveSelectedCart: (props) => (prod, qty = 1) => {
      const { removeItemSelectedCart, shippingOptions, paymentMethods } = props;

      let product = productToProductCart(prod, qty, shippingOptions, paymentMethods);

      removeItemSelectedCart(product);
    },
    handleAPIFavorite: (props) => (id, isFavorite) => {
      const { addFavorite, removeFavorite, favoriteProducts, addFavoriteClient, removeFavoriteClient } = props;
      if (isFavorite) {
        addFavoriteClient(id);
        addFavorite(id)
          .then(() => {})
          .catch((err) => {
            showToastError(err);
          });
      } else {
        removeFavoriteClient(id);
        removeFavorite(id)
          .then(() => {})
          .catch((err) => {
            showToastError(err);
          });
      }
    }
  })
)(ProductItem);
