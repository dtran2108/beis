import React, { useState } from 'react';
import { Typography } from 'antd';
import { Logo, User, Search, Cart } from '~/assets/svg';

const Header = () => {
  const linkItems = ['Shop All', 'Featured', 'Bags', 'Luggage', 'Accessories', 'Sale', 'Rewards'];

  return (
    <div className="fostr-header">
      <div className="fostr-header__navigation ju_forcepush">
        <h1 className="fostr-header__navigation__logo">
          <a href="/" rel="home">
            <Logo />
          </a>
        </h1>
        <nav className="d-flex align-items-center justify-content-between">
          {linkItems.map((item, i) => (
            <Typography.Link key={i} className="mx-4" href="/" style={{ color: '#000' }}>
              {item}
            </Typography.Link>
          ))}
        </nav>
        <nav className="d-flex">
          <Typography.Link className="mx-2" href="/">
            <User />
          </Typography.Link>
          <Typography.Link className="mx-2" href="/">
            <Search />
          </Typography.Link>
          <Typography.Link className="mx-2 d-flex align-items-center justify-content-center" href="/">
            <span style={{ color: '#000', transform: 'translateY(5px)' }} className="mr-2">
              0
            </span>
            <span>
              <Cart />
            </span>
          </Typography.Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
