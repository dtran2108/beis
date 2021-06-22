import React, { useState } from 'react';
import { Avatar as AntAvatar } from 'antd';
import emptyImage from '~/assets/images/empty_image.jpg';

const Avatar = ({ src, size }) => {
  const [componentURL, setComponentURL] = useState(src);
  return (
    <AntAvatar
      src={componentURL}
      size={size}
      onError={() => {
        setComponentURL(emptyImage);
      }}
    />
  );
};
export default Avatar;
