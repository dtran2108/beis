import React from 'react';
import { Alert } from 'antd';
import { getArray } from '~/utils/helpers/utilObject';
import styled from 'styled-components';
const Wrap = styled.div`
  margin-bottom: 15px;
  .ant-alert-message {
    font-size: 13px;
    line-height: 1.5;
    margin: 0.5em 0;
    padding: 2px;
  }
  .ant-alert-info {
    background: #fff;
    align-items: center;
    display: flex;
    border: 1px solid #ccd0d4;
    border-left-width: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    margin: 5px 15px 2px;
    padding: 1px 12px;
    height: 40px;
    border-left-color: ${(props) => props.color};
    margin-left: 0px;
  }
`;
/**
 * viet @params (mess,type,showIcon)
 * type="success"
 * type="info"
 * type="warning"
 * type="error"
 */
const renderAlert = (props) => {
  const { message, type, showIcon } = props;
  const mapColor = (color) => {
    switch (color) {
      case 'info':
        return '#00a0d2';
      case 'warning':
        return '#ffba00';
      case 'success':
        return '#06ee06';
      case 'error':
        return 'red';
      default:
        return '#00a0d2';
    }
  };

  return (
    <Wrap color={mapColor(type)}>
      <Alert message={message} showIcon={showIcon} closable />
    </Wrap>
  );
};

const AlertComponent = (props) => {
  const { dataSouce } = props;

  return getArray(dataSouce, undefined, []).map(renderAlert);
};

export default AlertComponent;
