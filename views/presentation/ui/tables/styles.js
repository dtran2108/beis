import styled from 'styled-components';
import { Table } from 'antd';
import { Color } from '~/views/utils/layout';

export const TableStyle = styled(Table)`
  thead {
    color: ${Color.gray};
    th {
      background-color: ${Color.orange3};
      color: ${Color.white};
      font-weight: 400;
      text-align:center;
      padding: 12px 16px;
    }
    th.ant-table-column-sort {
      background-color: ${Color.orange3};
    }
  }
  tbody {
    background-color: ${Color.white};
    tr:nth-child(even){
      background-color: ${Color.orange}
    }
    td.ant-table-column-sort {
      background-color: ${Color.white};
    }
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
        color: ${Color.red};
      }
    }
  }
  .ant-pagination {
    border-top: none !important;
    .ant-pagination-options{
      display: none;
    }
  }
  .ant-pagination-item-active {
    background-color: ${Color.green};
    font-weight: bold;
    line-height:24px;
    border:none;
    a,
    &:hover a {
      color: ${Color.orange3};
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    height: 24px;
    min-width: 24px;
    line-height: 24px;
    &:hover {
      .ant-pagination-item-link {
        border-color:${Color.green}
        color: ${Color.green};
      }
    }
  }
  .ant-pagination-next.ant-pagination-disabled,.ant-pagination-prev.ant-pagination-disabled{
    .ant-pagination-item-link{
      border-color: #a7a7a7;
    }
    &:hover{
      .ant-pagination-item-link{
        border-color: #d9d9d9;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: ${Color.red};
  }
`;
