import React, { useEffect, useState } from 'react';
import { accountMenus } from '~/configs/menus';
import * as PATH from '~/configs/routesConfig';
import Link from 'next/link';
import { Typography } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { authActions } from '~/redux/authUser';

const UlStyled = styled.ul`
  list-style-type: none;
`;

const TitleStyled = styled(Typography)`
  color: ${(props) => (props.active ? '#074494 !important' : '#000 !important')};
  cursor: pointer;
`;

function AccountSideMenus(props) {
  const [location, setLocation] = useState();
  const router = useRouter();
  useEffect(() => {
    setLocation(window.location.pathname === '/en' ? 'home' : window.location.pathname);
  }, []);

  const checkActive = (currentLocation, url) => {
    if (currentLocation?.split('/').includes(url.split('/')[url.split('/').length - 1])) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Typography.Title level={4} className="mb-5">
        Xin chào {props.user?.name}!
      </Typography.Title>
      <UlStyled>
        {accountMenus.map((menu, i) => {
          return (
            <>
              <li key={i}>
                <Link href={menu.path}>
                  <TitleStyled className="d-flex align-items-center" active={checkActive(location, menu.path)} level={5}>
                    {menu.icon}
                    {menu.title}
                  </TitleStyled>
                </Link>
              </li>
              {menu.submenus &&
                menu?.submenus.map((me, i) => (
                  <li key={i}>
                    <Link href={me.path}>{me.title}</Link>
                  </li>
                ))}
            </>
          );
        })}
        <li>
          <Button
            className="p-0 m-0 d-flex align-items-center"
            type="link"
            icon={<PoweroffOutlined />}
            onClick={() => {
              props.logout();
              router.push(PATH.LOGIN_PATH);
            }}
            style={{ textTransform: 'none', textDecoration: 'none', color: '#000' }}>
            Đăng xuất
          </Button>
        </li>
      </UlStyled>
    </>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser?.user
  }),
  {
    logout: authActions.logout
  }
)(AccountSideMenus);
