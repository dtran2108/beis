import React from 'react';
import * as PATH from './routesConfig';
import { UserOutlined, ShoppingOutlined, CalendarOutlined, RedoOutlined } from '@ant-design/icons';
import { RetweetOutlined, CreditCardOutlined } from '@ant-design/icons';

export const accountMenus = [
  {
    path: PATH.ACCOUNT_MANAGEMENT_PATH,
    title: 'Quản lý tài khoản',
    icon: <UserOutlined className="mr-2" />
  },
  {
    path: PATH.PRODUCT_MANAGEMENT_PATH,
    title: 'Quản lý sản phẩm',
    icon: <CalendarOutlined className="mr-2" />
  },
  {
    path: PATH.ACCOUNT_BOOKING_MANAGEMENT_PATH,
    title: 'Quản lý Booking',
    icon: <ShoppingOutlined className="mr-2" />
  },
  {
    path: '#!',
    title: 'Bồi hoàn',
    icon: <RedoOutlined className="mr-2" />
  },
  {
    path: '#!',
    title: 'Chuyển nhượng',
    icon: <RetweetOutlined className="mr-2" />
  },
  {
    path: '#!',
    title: 'Cấp lại thẻ',
    icon: <CreditCardOutlined className="mr-2" />
  }
];

export const headerMenus = [
  { title: 'Shop All', link: '/' },
  { title: 'Featured', link: '/featured' },
  { title: 'Bags', link: '/' },
  { title: 'Luggage', link: '/' },
  { title: 'Accessories', link: '/' },
  { title: 'Sale', link: '/' },
  { title: 'Rewards', link: '/rewards' }
];

export const authorizedMenus = [
  {
    path: PATH.ACCOUNT_MANAGEMENT_PATH,
    title: 'Quản lý tài khoản'
  },
  {
    path: PATH.ACCOUNT_BOOKING_MANAGEMENT_PATH,
    title: 'Quản lý booking'
  },
  {
    path: PATH.RESET_PASSWORD_PATH,
    title: 'Đổi mật khẩu'
  }
];
