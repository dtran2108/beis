import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import { withRouter } from 'next/router';
import _ from 'lodash';
import { parseCurrency } from '~/views/utils/helpers';
import { getString, getNumber, firstImage, getArray, getObject } from '~/utils/helpers/utilObject';
import { Card, Rate, Typography } from 'antd';
import * as PATH from '~/configs/routesConfig';
import strings from '~/localization';
import styled from 'styled-components';
import Link from 'next/router';

const WrapProductItem = styled.div`
  .secondary-price {
    font-size: 12px !important;
    line-height: 14px !important;
    color: #8c8c8c !important;
  }
`;
const { Text } = Typography;

class ProductItem extends PureComponent {
  renderPrice(item) {
    let pricingRanges = _.head(getArray(item, 'pricingOptions', []));

    const finalPrice = getObject(pricingRanges, 'finalPrice');
    const finalSalePrice = getObject(pricingRanges, 'finalSalePrice');

    const fromPrice = getNumber(finalPrice, 'fromPrice', 0);
    const toPrice = getNumber(finalPrice, 'toPrice', 0);
    const unit = getString(finalPrice, 'unit', strings.unit);

    let priceSaleTrue = 0;
    let priceTrue = 0;

    if (getNumber(finalSalePrice, 'fromPrice', 0) !== 0) {
      const fromSalePrice = getNumber(finalSalePrice, 'fromPrice', 0);
      const toSalePrice = getNumber(finalSalePrice, 'toPrice', 0);

      if (fromSalePrice === toSalePrice && fromSalePrice !== 0) priceSaleTrue = `${parseCurrency(fromSalePrice)} /${unit}`;
      else priceSaleTrue = `${parseCurrency(fromSalePrice)} - ${parseCurrency(toSalePrice)} /${unit}`;
      if ((fromPrice === toPrice && fromPrice !== 0) || fromPrice > toPrice) priceTrue = `${parseCurrency(fromPrice)} /${unit}`;
      else priceTrue = `${parseCurrency(fromPrice)} - ${parseCurrency(toPrice)} /${unit}`;
      return (
        <>
          <h6>{priceSaleTrue}</h6>
          <Text className="secondary-price" type="secondary" delete>
            {priceTrue}
          </Text>
        </>
      );
    } else {
      if (fromPrice === toPrice && fromPrice !== 0) priceTrue = `${parseCurrency(fromPrice)} /${unit}`;
      else priceTrue = `${parseCurrency(fromPrice)} - ${parseCurrency(toPrice)} /${unit}`;
      return (
        <>
          <h6>{priceTrue}</h6>
        </>
      );
    }
  }

  render() {
    const { itemData, history } = this.props;
    return (
      <WrapProductItem className="product-block">
        <div className="product-image">
          <LazyLoad height={220} throttle={240}>
            <Card
              hoverable
              className="img-lazyload d-flex flex-column"
              cover={
                <Link onClick={() => history.push(PATH.PURCHASES_SHOP_DETAIL.replace(':id', getNumber(itemData, 'id')))}>
                  <img alt={getString(itemData, 'name')} src={itemData.images ? firstImage(getString(itemData, 'images')) : ''} />
                </Link>
              }>
              <div className="content-name d-flex flex-column mb-auto">
                <span>{getString(itemData, 'name') || ''}</span>
                {this.renderPrice(itemData)}
                <div className="content-rating mt-1">
                  <Rate disabled allowHalf defaultValue={itemData.rate} className="d-flex " />
                </div>
              </div>
            </Card>
          </LazyLoad>
        </div>
      </WrapProductItem>
    );
  }
}

ProductItem.propType = {};

ProductItem.defaultProps = {};

export default withRouter(ProductItem);
