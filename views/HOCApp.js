import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { BackTop, message, notification } from 'antd';
import { UpOutlined } from '@ant-design/icons';
const Header = dynamic(import('~/views/container/Header'));
const Footer = dynamic(import('~/views/container/Footer'));
import styled from 'styled-components';

const WrapStyleGlobal = styled.div`
  font-family: Montserrat !important;
`;

const HOCApp = (props) => {
  const router = useRouter();
  message.config({
    duration: 2,
    maxCount: 1
    // prefixCls: ''
  });

  notification.config({
    duration: 4,
    maxCount: 2
  });

  const backTopStyle = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: '99px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 14
  };

  useEffect(() => {
    const location = window.location.pathname;
    if (location.split('/').includes('account') && !props.isAuthenticated) {
      router.push('/');
    }
  }, [props.isAuthenticated]);

  return (
    <WrapStyleGlobal>
      <Header />
      {props.children}
      <Footer />
      <BackTop>
        <div style={backTopStyle} className="d-flex align-items-center justify-content-center">
          <UpOutlined />
        </div>
      </BackTop>
    </WrapStyleGlobal>
  );
};

export default connect((state) => ({
  isAuthenticated: state?.authUser?.isAuthenticated
}))(HOCApp);
