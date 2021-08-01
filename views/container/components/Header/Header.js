import React from 'react';
import MainHeader from './MainHeader';
import MobileHeader from './MobileHeader';
import { useWindowSize } from 'react-use';

const Header = () => {
  const { width, height } = useWindowSize();
  return width <= 768 ? <MobileHeader /> : <MainHeader />;
};

export default Header;
