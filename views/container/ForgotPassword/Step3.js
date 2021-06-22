import React, { useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { UIPrimaryButton } from '~/views/presentation/ui/buttons';
import { UIPasswordInputCBP } from '~/views/presentation/ui/fields';
import { KeyOutlined } from '@ant-design/icons';
import * as ANT_VALIDATE from '~/views/utils/helpers/ant-validation';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { authActions } from '~/redux/authUser';
import CenterLayout from '~/views/container/components/CenterLayout';
import { parseError } from '~/views/utils/helpers/parseError';

const FormStyled = styled(Form)`
  .ant-form-item-has-success {
    margin-bottom: 0px !important;
  }
`;

function StepThree(props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const onFinish = (values) => {
    setSubmitting(true);
    const body = { key: props.resetKey, newPassword: values.password };
    props
      .finishResetPass(body)
      .then((res) => {
        setSubmitting(false);
        props.setFormError(null);
        router.push('/');
        message.success('Thay đổi mật khẩu thành công');
      })
      .catch((err) => {
        setSubmitting(false);
        props.setFormError(parseError(err));
      });
  };

  const onFinishFailed = (err) => {
    console.error('trandev ~ file: index.js ~ line 13 ~ onFinishFailed ~ err', err);
  };

  return (
    <FormStyled {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <CenterLayout className="mb-5">
        <UIPasswordInputCBP
          name="password"
          label="Mật khẩu mới"
          className="w-100"
          placeholder="Nhập mật khẩu mới"
          prefix={<KeyOutlined size="large" />}
          rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.passwordValidate(6))}
        />
        <UIPasswordInputCBP
          name="rePassword"
          label="Nhập lại mật khẩu"
          className="w-100"
          placeholder="Nhập lại mật khẩu mới"
          prefix={<KeyOutlined size="large" />}
          rules={ANT_VALIDATE.commonValidate()
            .concat(ANT_VALIDATE.passwordValidate(6))
            .concat(({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp'));
              }
            }))}
        />
        <Form.Item className="align-self-center mt-5">
          <UIPrimaryButton
            style={{ height: '56px', minWidth: '300px', fontSize: '1.2rem' }}
            htmlType="submit"
            loading={submitting}
            title="Thay đổi mật khẩu"></UIPrimaryButton>
        </Form.Item>
      </CenterLayout>
    </FormStyled>
  );
}

export default connect(null, {
  finishResetPass: authActions.finishResetPass
})(StepThree);
