import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import SubHeader from '../SubHeader';
import Link from 'next/link';
import { UIPrimaryButton } from '~/views/presentation/ui/buttons';
import { UIInputCBP, UIPasswordInputCBP } from '~/views/presentation/ui/fields';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { authActions } from '~/redux/authUser';
import { connect } from 'react-redux';
import { message, Alert, Result, Button } from 'antd';
import { useRouter } from 'next/router';
import * as ANT_VALIDATE from '~/utils/helpers/ant-validation';
import CenterLayout from '../components/CenterLayout';
import { parseError, getErrorDescription } from '~/views/utils/helpers/parseError';
import BarLoader from 'react-spinners/BarLoader';
import { LOGIN_PATH } from '~/configs/routesConfig';

const Login = (props) => {
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState();

  useEffect(() => {
    setTimeout(() => {
      if (router?.query?.encode) {
        props
          .putActiveAccount(router?.query?.encode)
          .then((res) => {
            setStatus('success');
          })
          .catch((err) => {
            console.error(`ithoangtan -  ~ file: index.js ~ line 33 ~ setTimeout ~ err`, err);
            setStatus('error');
          });
      }
    }, 2000);
  }, [router?.query?.encode]);

  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area">
          <SubHeader backgroundUrl="/images/header/login-bg.png" title="Kích hoạt tài khoản" />
          <div>
            <CenterLayout className="my-5">
              {status === 'success' && (
                <Result
                  status="success"
                  title="Tài khoản của bạn kích hoạt thành công!"
                  subTitle="Có ai đó đang cố gắng đăng nhập với tài khoản của bạn liên hệ với bộ phận kỹ thuật nếu như bạn thấy bất thường trong hệ thống."
                  extra={[
                    <Button
                      size="large"
                      onClick={() => {
                        router.push(LOGIN_PATH);
                      }}
                      type="primary">
                      Đăng nhập
                    </Button>
                  ]}
                />
              )}
              {status === 'loading' && (
                <Result
                  icon={
                    <div className="d-flex justify-content-center align-items-center  ">
                      <BarLoader width={250} height={5} loading={true} />
                    </div>
                  }
                  title="Chúng tôi đang xử lý yêu cầu của bạn!"
                  subTitle="Vui lòng đợi trong giây lát..."
                />
              )}

              {status === 'error' && (
                <Result
                  status="error"
                  title={error ? t(error) : 'Yêu cầu của bạn không hợp lệ!'}
                  subTitle="Vui lòng kiểm tra lại, chúng tôi sẽ khóa vĩnh viễn tài khoản của bạn nếu thực hiện quá nhiều yêu cầu không hợp lệ."
                  extra={[
                    <Button
                      size="large"
                      onClick={() => {
                        router.push(LOGIN_PATH);
                      }}
                      type="primary">
                      Đăng nhập
                    </Button>
                  ]}
                />
              )}
            </CenterLayout>
          </div>
        </div>
      </main>
    </>
  );
};

export default connect(
  (state) => ({
    loginInfo: state?.authUser?.loginInfo
  }),
  {
    login: authActions.login,
    setRemember: authActions.setRemember,
    unsetRemember: authActions.unsetRemember,
    getUser: authActions.getUser,
    setLoginInfo: authActions.setLoginInfo,
    unsetLoginInfo: authActions.unsetLoginInfo,
    putActiveAccount: authActions.putActiveAccount
  }
)(Login);
