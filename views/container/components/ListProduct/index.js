import { Row, Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { getNumber } from '~/utils/helpers/utilObject';
import _ from 'lodash';

import Product from './product';

const WrapListProduct = styled.div``;

const ListProduct = ({ products = [], distance, isSale = false, isCombo = false }) => {
  return (
    <Row gutter={16}>
      {products.length === 0 && <Skeleton active avatar={{ shape: 'square', size: 140 }} title paragraph></Skeleton>}
      {products.map((item, key) => {
        // cho trường hợp chọn sản phẩm từ cửa hàng đã xác định
        let id = getNumber(item, 'id');
        let productTradingId;
        if (item?.promotions?.length !== 0 && !_.isUndefined(item?.promotions?.length )) {
          isSale = true
        }
        if (item?.isCombo) {
          isCombo = true
        }
        if (getNumber(item, 'productId')) id = getNumber(item, 'productId');
        if (getNumber(item, 'productId')) {
          productTradingId = getNumber(item, 'id');
          id = getNumber(item, 'productId');
        }
        if (isCombo) productTradingId = getNumber(item, 'id');
        
        let addDistance = {
          ...item,
          distance: +distance,
          id, // cho trường hợp chọn sản phẩm từ cửa hàng đã xác định
          productTradingId // cho trường hợp chọn sản phẩm từ cửa hàng đã xác định
        };
        return <Product key={key} prod={addDistance} isSale={isSale} isCombo={isCombo} />;
      })}
    </Row>
  );
};

export async function getStaticProps({ preview = null }) {
  return { props: { preview } };
}

export default ListProduct;
