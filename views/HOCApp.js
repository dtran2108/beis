import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { message, notification } from 'antd';
import Header from '~/container/components/Header/Header';
import Footer from '~/views/container/components/Footer';

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

  // const backTopStyle = {
  //   height: 40,
  //   width: 40,
  //   lineHeight: '40px',
  //   borderRadius: '99px',
  //   backgroundColor: '#000',
  //   color: '#fff',
  //   fontSize: 14
  // };

  useEffect(() => {
    const location = window.location.pathname;
    if (location.split('/').includes('account') && !props.isAuthenticated) {
      router.push('/');
    }
  }, [props.isAuthenticated]);

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default connect((state) => ({
  isAuthenticated: state?.authUser?.isAuthenticated
}))(HOCApp);
