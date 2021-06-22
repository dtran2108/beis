import React from 'react';
import styled from 'styled-components';

const WrapImg = styled.img`
  max-width: 100%;
  object-fit: cover;
  font-size: 8px;
  min-width: 100%;
  /* height: auto; */
`;

const UIImage = ({ src, alt = 'error', width = 'auto', height = 'auto', isIcon = false, styleImg, className, onClick }) => {
  return (
    <WrapImg
      className={className}
      onClick={onClick}
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ maxHeight: height, minWidth: width, objectFit: isIcon ? 'contain' : 'cover', ...styleImg }}
    />
  );
};

export default UIImage;
