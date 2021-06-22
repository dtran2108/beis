import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const CardStyled = styled(Card)`
  .ant-card-head-title {
    font-weight: bold;
    font-size: 14px;
  }
  .ant-card-head {
    border-bottom: 1px solid #707070;
  }
  .ant-card-extra .ant-btn-link {
    text-transform: none;
  }
`;

export default function AccountCardStyled(props) {
  return <CardStyled {...props}>{props.children}</CardStyled>;
}
