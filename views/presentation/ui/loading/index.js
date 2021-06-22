import React from 'react';
import styled from 'styled-components';

import { ImagesLoading } from '~/static/images';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
  text-align: center;
  .loading {
    top: 50%;
    position: fixed;
    transform: translateX(-50%);
    height: 100px;
    width: 100px;
  }
`;
export default function Loading() {
  return (
    <Wrap>
      <img className="loading" src={ImagesLoading} alt="no thing" />
    </Wrap>
  );
}
