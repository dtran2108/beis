import { List, Empty, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { compose } from 'recompose';
import styled from 'styled-components';
import { getArray, getBool, getNumber } from '~/views/utils/helpers/utilObject';
import ProductItemSearch from '../ListProduct/product';

const InfiniteScrollStyle = styled.div`
  .ant-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 !important;
    padding-left: 10px;
  }
  .infinite-scroll-component__outerdiv .infinite-scroll-component {
    overflow: inherit !important;
  }
  .ant-spin-container {
    .ant-col {
      min-width: 100%;
    }
  }
`;
const LoadMoreStyle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 17px;
  span {
    color: #1890ff;
    margin-left: 10px;
  }
`;
const EmptyStyle = styled.div`
  flex: 1;
`;

const ListItemProduct = (props) => {
  const [size, setSize] = useState(props.pagination.size);

  const { dataItem, handleLoadMore, isCombo } = props;
  let items = getArray(dataItem, 'items') || [];
  let loading = getBool(dataItem, 'loading', false);

  useEffect(() => {
    if (size !== props.pagination.size) {
      props.setPagination({ ...props.pagination, size, page: 1, isChangeSize: true });
    }
    return () => {};
  }, [size]);

  return (
    <InfiniteScrollStyle>
      <InfiniteScroll
        hasMore={false}
        loadMore={handleLoadMore}
        pageStart={0}
        loading={
          <LoadMoreStyle>
            <div>
              <Spin />
              <span>Đang tải...</span>
            </div>
          </LoadMoreStyle>
        }>
        <div className="">
          <List
            grid={{ gutter: 20, column: 4 }}
            dataSource={items}
            className="search__list"
            renderItem={(item, key) => {
              let id = getNumber(item, 'id');
              let productTradingId,
                isSale = false,
                isCombo = false;
              if (item?.promotions?.length !== 0 && !_.isUndefined(item?.promotions?.length)) {
                //check isSale product
                isSale = true;
              }
              if (item?.isCombo) {
                //check isCombo product
                isCombo = true;
              }
              if (getNumber(item, 'productId')) id = getNumber(item, 'productId');
              if (getNumber(item, 'productId')) {
                productTradingId = getNumber(item, 'id');
                id = getNumber(item, 'productId');
              }
              if (isCombo) productTradingId = getNumber(item, 'id');

              let addDistance = {
                ...item,
                id, // cho trường hợp chọn sản phẩm từ cửa hàng đã xác định
                productTradingId // cho trường hợp chọn sản phẩm từ cửa hàng đã xác định
              };
              if (items.length > 0) {
                return (
                  <ProductItemSearch
                    key={key}
                    prod={addDistance}
                    isSale={isSale}
                    isCombo={isCombo} // for list promotion product
                  />
                );
              } else if (loading === false) {
                return (
                  <EmptyStyle>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </EmptyStyle>
                );
              } else {
                null;
              }
            }}
            pagination={{
              pageSizeOptions: [8, 16, 32, 64, 128],
              showQuickJumper: true,
              showSizeChanger: true,
              total: getNumber(props.pagination, 'total'),
              current: props.pagination.page,
              pageSize: size,
              defaultPageSize: props.pagination.size,
              onChange: (page, pageSize) => {
                props.setPagination({ ...props.pagination, page });
              },
              onShowSizeChange: (current, size) => {
                setSize(size);
              }
            }}
          />
        </div>
      </InfiniteScroll>
    </InfiniteScrollStyle>
  );
};

export default compose()(ListItemProduct);
