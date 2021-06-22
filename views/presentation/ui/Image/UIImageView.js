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
  min-height: 150px;
  max-height: 150px;
`;

const UIImageView = ({ style, src, error = 'error', fallback, preview, onClick = () => '' }) => {
  return (
    <WrapImgView
      onClick={onClick}
      preview={preview}
      style={style}
      src={src.includes('http') ? src : `${IMG_URL}/${src}`}
      error={error}
      fallback={fallback}
    />
  );
};

export default UIImageView;
