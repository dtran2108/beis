import React from 'react';
import { useRouter } from 'next/router';
import { Button, Drawer, Menu } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { authActions } from '~/redux/authUser';
import { PoweroffOutlined, LoginOutlined } from '@ant-design/icons';
import { authorizedMenus } from '~/configs/menus';

const { SubMenu } = Menu;

const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 !important;
  }
`;

function MobileDrawer(props) {
  const router = useRouter();
  const handleClick = (e) => {
    if (e.key == 'logout') {
      props.logout();
      props.setDrawerVisible(false);
      router.push('/login');
    } else {
      router.push(e.key);
    }
  };

  return (
    <DrawerStyled
      title={<img src="/vninturist-assets/wp-content/uploads/2020/12/Logo-VNT-ngang.png" alt="logo ngang" width="100%" height="auto" />}
      placement={'left'}
      closable={false}
      onClose={() => props.setDrawerVisible(false)}
      visible={props.drawerVisible}>
      <Menu onClick={handleClick} style={{ width: 256 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
        <>
          {props.user && (
            <SubMenu key={0} title={`Xin Chào ${props.user?.name}!`}>
              {authorizedMenus.map((item) => (
                <Menu.Item style={{ textTransform: 'capitalize' }} key={item.path}>
                  {item.title}
                </Menu.Item>
              ))}
            </SubMenu>
          )}
          {props.menu.map((item) => {
            return item?.submenu?.length > 0 ? (
              <SubMenu key={item.key} title={item.title}>
                {item.submenu.map((subItem) => (
                  <Menu.Item key={subItem.link}>{subItem.title}</Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.link}>{item.title}</Menu.Item>
            );
          })}
        </>
        {props.user ? (
          <Menu.Item key="logout" className="d-flex align-items-center">
            <PoweroffOutlined />
            Đăng xuất
          </Menu.Item>
        ) : (
          <Menu.Item key="/login" className="d-flex align-items-center">
            <LoginOutlined />
            Đăng nhập
          </Menu.Item>
        )}
      </Menu>
    </DrawerStyled>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser.user
  }),
  {
    logout: authActions.logout
  }
)(MobileDrawer);
