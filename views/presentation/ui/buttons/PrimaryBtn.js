import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  background: linear-gradient(to right, #c16397, #4539a3);
  border-color: transparent;
  border-radius: 99px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-family: Montserrat;
  font-weight: bold;
  text-transform: none;
  transition: all 0.2s ease-in-out;
  width: ${(props) => `${props.title.length + 140}px`};
`;

export default function PrimaryBtn(props) {
  return (
    <ButtonStyled type="primary" title={props.title} size={props.size || 'large'} {...props}>
      {props.title}
    </ButtonStyled>
  );
}
