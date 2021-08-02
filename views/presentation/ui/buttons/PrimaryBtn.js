import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  background-color: #000;
  border: 1px solid #000;
  font-size: 12px;
  :hover {
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
  }
`;

export default function PrimaryBtn(props) {
  return (
    <ButtonStyled style={{ width: props.width }} type="primary" {...props}>
      {props.children}
    </ButtonStyled>
  );
}
