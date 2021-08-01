import React from 'react';
import { Typography } from 'antd';
import { Logo, User, Search, Cart } from '~/assets/svg';
import { headerMenus } from '~/configs/menus';
import { useWindowSize } from 'react-use';

const MobileHeader = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="fostr-header">
      <div className="fostr-header__navigation ju_forcepush" style={{ padding: '0 10px !important' }}>
        <button className="fostr-header__navigation__toggle t-circular-reveal t-circular-reveal--mobile js-toggle-mobile-menu">
          <span />
          <span />
          <span />
        </button>
        <h1 className="fostr-header__navigation__logo">
          <a href="/" rel="home">
            <Logo />
          </a>
        </h1>
        <nav className="d-flex">
          {width > 426 && width <= 768 && (
            <Typography.Link className="mx-2" href="/">
              <User />
            </Typography.Link>
          )}
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
      <nav className="fostr-header__navigation__links-mobile">
        {headerMenus.map((item, i) => (
          <Typography.Link
            className="fostr-header__navigation__links__item navigation__item"
            key={i}
            href={item.link}
            style={{ color: '#000', position: 'relative' }}>
            {item.title}
          </Typography.Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileHeader;
