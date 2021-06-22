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
  {
    title: 'Trang chủ',
    link: PATH.HOME_PATH,
    paths: [''],
    submenu: []
  },
  {
    key: 2,
    title: 'CBP x BIDV',
    link: '#!',
    paths: ['introduce', 'cards'],
    submenu: [
      {
        title: 'Giới Thiệu',
        link: PATH.CBP_BIDV_INTRODUCE_PATH
      },
      {
        title: 'Các Hạng Thẻ',
        link: PATH.CBP_BIDV_CARDS_PATH
      }
    ]
  },
  {
    title: 'Giới Thiệu',
    link: PATH.ANNOUNCE_PATH,
    paths: ['announce'],
    submenu: []
  },
  {
    key: 6,
    title: 'Tính Năng',
    link: '#!',
    paths: ['features', 'booking', 'transfer'],
    submenu: [
      {
        title: 'Booking',
        link: PATH.BOOKING_PATH
      },
      {
        title: 'Chuyển Nhượng',
        link: PATH.TRANSFER_PATH
      },
      {
        key: 9,
        title: 'Bồi Hoàn',
        link: 'boi-hoan.html'
      },
      {
        key: 10,
        title: 'Cấp Lại Thẻ',
        link: 'cap-lai-the.html'
      }
    ]
  },
  {
    key: 12,
    title: 'Blogs',
    link: 'blogs.html',
    paths: ['blogs'],
    submenu: []
  },
  {
    key: 13,
    title: 'Liên hệ',
    link: 'lien-he.html',
    paths: ['contact'],
    submenu: [
      {
        key: 14,
        title: 'Về CBPPlus',
        link: 'booking.html'
      },
      {
        key: 15,
        title: 'Hệ thống phân phối',
        link: 'chuyen-nhuong.html'
      },
      {
        key: 16,
        title: 'Hướng dẫn sử dụng',
        link: 'boi-hoan.html'
      },
      {
        key: 17,
        title: 'Điều kiện/ Điều khoản',
        link: 'cap-lai-the.html'
      }
    ]
  }
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
