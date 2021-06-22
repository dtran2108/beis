import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import { Color } from '~/utils/layout';

const PaginationStyle = styled.div`
  text-align: right;
  display: inline-flex;
  .ant-pagination {
    display: flex;
    align-items: center;
  }
  .ant-pagination-item {
    border: none;
    border-radius: 2px;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 10px;
    &:hover {
      a {
        color: ${Color.green};
      }
    }
  }
  .ant-pagination-item-active {
    background-color: ${Color.green};
    font-weight: bold;
    line-height: 24px;
    border: none;
    a,
    &:hover a {
      color: ${Color.primaryText};
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    height: 24px;
    min-width: 24px;
    line-height: 24px;
    &:hover {
      .ant-pagination-item-link {
        border-color: ${Color.green};
        color: ${Color.green};
      }
    }
  }

  .ant-pagination-next.ant-pagination-disabled,
  .ant-pagination-prev.ant-pagination-disabled {
    .ant-pagination-item-link {
      border-color: #a7a7a7;
    }
    &:hover {
      .ant-pagination-item-link {
        border-color: #a7a7a7;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
  .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: ${Color.green};
  }
  .ant-pagination-options {
    display: none;
  }
`;

const UIPagination = (props) => {
  const { defaultCurrent, total, pageSize, onChange, ...rest } = props;

  return (
    <PaginationStyle>
      <Pagination defaultCurrent={defaultCurrent} total={total} pageSize={pageSize} onChange={onChange} {...rest} />
    </PaginationStyle>
  );
};

export default UIPagination;
