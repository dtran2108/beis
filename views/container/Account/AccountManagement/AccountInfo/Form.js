import React, { useState } from 'react';
import { Form, Button, message, Input } from 'antd';
import { authActions } from '~/redux/authUser';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as ANT_VALIDATE from '~/views/utils/helpers/ant-validation';
import { parseError } from '~/utils/helpers/parseError';

const FormItemStyled = styled(Form.Item)`
  .ant-form-item-label label {
    margin: 0;
    transition: all 0.3s ease-in-out;
  }
  @media screen and (min-width: 769px) {
    .ant-form-item-label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

const PasswordStyled = styled(Form.Item)`
  .ant-form-item-label label {
    margin: 0;
  }
  @media screen and (min-width: 769px) {
    .ant-form-item-label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .ant-form-item-control-input {
    border: 1px solid #000;
  }
  .ant-input,
  .ant-input-affix-wrapper {
    background-color: #fff;
    border-color: #fff;
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: #fff;
  }
`;

function AccountForm(props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const layout = {
    labelCol: { lg: { span: 12 }, md: { span: 24 } },
    wrapperCol: { lg: { span: 12 }, md: { span: 24 } }
  };

  const onFinish = (values) => {
    setSubmitting(true);
    const body = { ...values };
    props
      .changePassword(body)
      .then((res) => {
        setSubmitting(false);
        props.setIsEditing(false);
        message.success('Đổi mật khẩu thành công!');
      })
      .catch((err) => {
        setSubmitting(false);
        console.error('trandev ~ file: Form.js ~ line 60 ~ onFinish ~ err', err);
        props.setFormError(parseError(err));
      });
  };

  const onFinishFailed = (err) => {
    console.error('trandev ~ file: index.js ~ line 26 ~ onFinish ~ err', err);
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <FormItemStyled label="Email">
        <span>{props?.user?.email || ''}</span>
      </FormItemStyled>

      <PasswordStyled
        hasFeedback
        label="Mật khẩu hiện tại"
        name="currentPassword"
        rules={ANT_VALIDATE.commonValidate()}>
        <Input.Password />
      </PasswordStyled>

      <PasswordStyled
        hasFeedback
        label="Mật khẩu mới"
        name="newPassword"
        rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.passwordValidate(6))}>
        <Input.Password />
      </PasswordStyled>

      <PasswordStyled
        hasFeedback
        label="Nhập lại mật khẩu mới"
        name="rePassword"
        rules={ANT_VALIDATE.commonValidate().concat(({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('Mật khẩu không khớp'));
          }
        }))}>
        <Input.Password />
      </PasswordStyled>

      <div className="float-right mt-3">
        <Button type="dashed" className="ml-2 mb-0" onClick={() => props.setIsEditing(false)}>
          Huỷ
        </Button>
        <Button htmlType="submit" type="primary" className="m-0" loading={submitting}>
          Lưu thay đổi
        </Button>
      </div>
    </Form>
  );
}

export default connect(
  (state) => ({
    user: state?.authUser?.user
  }),
  { changePassword: authActions.changePassword }
)(AccountForm);
