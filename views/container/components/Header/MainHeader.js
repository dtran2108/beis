import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import { Logo, User, Search, Cart } from '~/assets/svg';
import { headerMenus } from '~/configs/menus';
import CartDrawer from './CartDrawer';

const MainHeader = () => {
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <>
      <div className="fostr-header">
        <div className="fostr-header__navigation ju_forcepush">
          <h1 className="fostr-header__navigation__logo">
            <a href="/" rel="home">
              <Logo />
            </a>
          </h1>
          <nav className="d-flex align-items-center justify-content-between">
            {headerMenus.map((item, i) => (
              <Typography.Link
                className="mx-4 fostr-header__navigation__links__item navigation__item"
                key={i}
                href={item.link}
                style={{ color: '#000', position: 'relative', fontSize: '18px' }}>
                {item.title}
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
            <Typography.Link className="mx-2 d-flex align-items-center justify-content-center">
              <span style={{ color: '#000', transform: 'translateY(5px)' }} className="mr-2">
                0
              </span>
              <span>
                <Button type="link" className="px-0" onClick={() => setCartVisible(true)}>
                  <Cart />
                </Button>
              </span>
            </Typography.Link>
          </nav>
        </div>
      </div>

      <CartDrawer setVisible={setCartVisible} visible={cartVisible} />
    </>
  );
};

export default MainHeader;
