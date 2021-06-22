import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as PATH from '~/configs/routesConfig';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import MobileDrawer from '../MobileDrawer';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { authorizedMenus } from '~/configs/menus';
import { authActions } from '~/redux/authUser';

const MastHead = (props) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  return (
    <>
      <div id="masthead" className="header-main hide-for-sticky">
        <div className="header-inner flex-row container logo-left medium-logo-center" role="navigation">
          {/* Logo */}
          <div id="logo" className="w-100 d-flex justify-content-between align-items-center">
            {/* Mobile Left Elements */}
            <div className="col-4 show-for-medium d-lg-none d-flex align-items-center justify-content-start">
              <Button onClick={() => setDrawerVisible(true)} type="link" icon={<MenuOutlined />} size="large" style={{ margin: 0 }} />
            </div>
            <MobileDrawer drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} menu={props.menu} />
            {/* Header logo */}
            <Link href="/" title="CBP Travel - Nghỉ Dưỡng Đẳng Cấp 5 Sao" rel="home">
              <img
                style={{ cursor: 'pointer' }}
                width={150}
                height={100}
                src="/vninturist-assets/wp-content/uploads/2020/12/Logo-VNT-ngang.png"
                className="header_logo header-logo col-6 col-md-4 col-lg-4"
                alt="CBP Travel"
              />
            </Link>
          </div>
          {/* Left Elements */}
          <div className="flex-col hide-for-medium flex-left flex-grow">
            <ul className="header-nav header-nav-main nav nav-left nav-uppercase" />
          </div>
          {/* Right Elements */}
          <div className="hide-for-medium d-flex flex-row align-items-center">
            <ul className="header-nav header-nav-main nav nav-right nav-uppercase d-flex">
              <li className="html header-button-1">
                <div className="header-button">
                  {props.isAuthenticated && props.user ? (
                    <li className="m-0 d-flex align-items-center menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2 current_page_item has-dropdown">
                      <span className="nav-top-link d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                        Xin chào, {props.user?.name}!
                        <FontAwesomeIcon icon={faChevronDown} style={{ width: '0.7rem', height: '0.7rem', marginLeft: '.5rem' }} />
                      </span>
                      <ul className="sub-menu nav-dropdown nav-dropdown-default d-flex flex-column justify-content-center align-items-center">
                        {authorizedMenus.map((menu, i) => (
                          <li
                            style={{ textTransform: 'uppercase' }}
                            key={i}
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-33">
                            <Link href={menu.path}>{menu.title}</Link>
                          </li>
                        ))}
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-33">
                          <Button
                            style={{ color: 'inherit' }}
                            className="m-0"
                            type="link"
                            onClick={() => {
                              props.logout();
                              router.push(PATH.LOGIN_PATH);
                            }}>
                            ĐĂNG XUẤT
                          </Button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <Link href="/login">
                      <span className="button secondary is-outline" style={{ borderRadius: '99px' }}>
                        ĐĂNG NHẬP
                      </span>
                    </Link>
                  )}
                </div>
              </li>
              <li className="html header-button-2">
                <div className="header-button">
                  <Link href="/features/booking">
                    <span className="button primary" style={{ borderRadius: '99px' }}>
                      BOOKING
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* Mobile Right Elements */}
          <div className="flex-col show-for-medium flex-right">
            <ul className="mobile-nav nav nav-right" />
          </div>
        </div>
        <div className="container">
          <div className="top-divider full-width" />
        </div>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    user: state.authUser.user
  }),
  { logout: authActions.logout }
)(MastHead);
