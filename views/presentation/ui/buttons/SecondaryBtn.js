import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  border-radius: 99px;
  border: 1px solid #000;
  font-family: Montserrat;
  font-weight: bold;
  text-transform: none;
  transition: all 0.2s ease-in-out;
  width: ${(props) => `${props.title.length + 140}px`};
  :hover {
    background-color: #000;
    color: #fff;
    border-color: transparent;
  }
`;

export default function SecondaryButton(props) {
  return (
    <ButtonStyled title={props.title} size={props.size || 'large'} {...props}>
      {props.title}
    </ButtonStyled>
  );
}
