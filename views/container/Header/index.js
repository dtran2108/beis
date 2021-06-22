import React from 'react';
import MastHead from './MastHead';
import HeaderBottom from './HeaderBottom';
import { headerMenus } from '~/configs/menus';

export default function Header() {
  return (
    <>
      <header id="header" className="header" style={{ zIndex: 100 }}>
        <div className="header-wrapper">
          <MastHead menu={headerMenus} />
          <div className="header-bg-container fill">
            <div className="header-bg-image fill" />
            <div className="header-bg-color fill" />
          </div>
        </div>
      </header>
      <header id="header" className="header has-sticky sticky-jump">
        <div className="header-wrapper">
          <HeaderBottom menu={headerMenus} />
          <div className="header-bg-container fill">
            <div className="header-bg-image fill" />
            <div className="header-bg-color fill" />
          </div>
        </div>
      </header>
    </>
  );
}
