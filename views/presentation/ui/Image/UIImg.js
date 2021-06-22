import React from 'react';
import styled from 'styled-components';
import { Image } from 'antd';
import { IMG_URL } from '~/configs/index';

const WrapImgView = styled(Image)`
  // no select
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;

  max-width: 100%;
  object-fit: cover;
  font-size: 8px;
`;

const UIImg = ({ style, className, width, height, src, error = 'error', fallback, preview = false }) => {
  return (
    <WrapImgView
      className={className}
      style={{ minWidth: width }}
      style={style}
      width={width}
      height={height}
      src={src.includes('http') ? src : `${IMG_URL}/${src}`}
      error={error}
      fallback={fallback}
      preview={preview}
    />
  );
};

export default UIImg;
