import React from 'react';
import Link from 'next/link';
import { Form, Input, Checkbox, Button } from 'antd';
import { phoneValidate, commonValidate, typeValidate } from '~/views/utils/helpers/ant-validation';

export default function RegisterForm() {
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const onFinish = (values) => {
    console.log('submitted', values);
  };

  const onFinishFailed = (error) => {
    console.error('trandev ~ file: index.js ~ line 22 ~ onFinishFailed ~ error', error);
  };

  return (
    <div className="register">
      <p className="register-des">Đăng ký để nhận thêm thông tin về các sản phẩm của CBP</p>
      <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item rules={commonValidate()} hasFeedback label="Họ và tên" name="fullName" required>
          <Input size="large" />
        </Form.Item>
        <Form.Item rules={typeValidate('email')} label="Email" name="email" hasFeedback required>
          <Input size="large" />
        </Form.Item>
        <Form.Item rules={phoneValidate()} label="Số điện thoại" name="phoneNumber" hasFeedback required>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="agreement" valuePropName="checked">
          <Checkbox style={{ fontWeight: 200 }} className="d-flex">
            Đồng ý với các <Link href="#!">chính sách điều khoản</Link> của chúng tôi
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="button is-large btn-package" style={{ width: '100%', borderRadius: '99px'}}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
