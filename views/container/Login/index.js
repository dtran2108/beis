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
import { message, Alert } from 'antd';
import { useRouter } from 'next/router';
import * as ANT_VALIDATE from '~/utils/helpers/ant-validation';
import CenterLayout from '../components/CenterLayout';
import { parseError, getErrorDescription } from '~/views/utils/helpers/parseError';

const FormStyled = styled(Form)`
  .ant-form-item-has-success {
    margin-bottom: 0px !important;
  }
`;

const Login = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (props.loginInfo) {
      form.setFieldsValue({ ...props.loginInfo });
    }
  }, [props.loginInfo]);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const onFinish = (values) => {
    setSubmitting(true);
    const body = { ...values, rememberMe: values.rememeberMe || false };

    if (values.rememberMe) {
      props.setRemember();
      props.setLoginInfo({ ...values });
    } else {
      props.unsetRemember();
      props.unsetLoginInfo();
    }

    props
      .login(body)
      .then((res) => {
        setSubmitting(false);
        message.success('Đăng nhập thành công!');
        props.getUser().then((res) => {
          router.push('/');
        });
      })
      .catch((err) => {
        setFormError(parseError(err));
        setSubmitting(false);
      });
  };

  const onFinishFailed = (err) => {
    console.error('trandev ~ file: index.js ~ line 13 ~ onFinishFailed ~ err', err);
  };

  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area">
          <SubHeader backgroundUrl="/images/header/login-bg.png" title="Đăng Nhập" />
          {formError && (
            <CenterLayout className="mt-5">
              <Alert message="Lỗi" description={getErrorDescription(formError)} type="error" showIcon />
            </CenterLayout>
          )}
          <FormStyled {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <CenterLayout className="my-5">
              <UIInputCBP
                name="username"
                label="Số series"
                className="w-100"
                placeholder="Nhập vào Số Series trên Gift Card Voucher của bạn"
                prefix={<MailOutlined size="large" />}
                rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.typeValidate('email'))}
              />
              <UIPasswordInputCBP
                name="password"
                label="Mật khẩu"
                className="w-100"
                placeholder="Nhập mật khẩu"
                prefix={<KeyOutlined size="large" />}
                rules={ANT_VALIDATE.commonValidate()}
              />
              <Form.Item name="rememberMe" valuePropName="checked" className="mt-3">
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>
              <Form.Item className="align-self-center m-0">
                <UIPrimaryButton
                  style={{ height: '56px', minWidth: '200px', fontSize: '1.2rem' }}
                  className="m-0 mb-3"
                  htmlType="submit"
                  loading={submitting}
                  title="Đăng nhập"></UIPrimaryButton>
              </Form.Item>
              <Link href="/resetpassword">
                <p className="align-self-center" style={{ color: '#572D9C', cursor: 'pointer' }}>
                  Quên mật khẩu?
                </p>
              </Link>
            </CenterLayout>
          </FormStyled>
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
    unsetLoginInfo: authActions.unsetLoginInfo
  }
)(Login);
