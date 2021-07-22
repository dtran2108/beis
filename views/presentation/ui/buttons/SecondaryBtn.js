import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  background-color: transparent;
  border: 1px solid #000;
  font-size: 12px;
  :hover {
    border: 1px solid #000;
    background-color: #000;
    color: #fff;
  }
`;

export default function SecondaryButton(props) {
  return (
    <ButtonStyled style={{ width: props.width }} type="secondary" {...props}>
      {props.children}
    </ButtonStyled>
  );
}
