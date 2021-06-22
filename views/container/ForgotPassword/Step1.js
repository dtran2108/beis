import React, { useState } from 'react';
import { Form } from 'antd';
import { UIPrimaryButton } from '~/views/presentation/ui/buttons';
import { UIInputCBP } from '~/views/presentation/ui/fields';
import { MailOutlined } from '@ant-design/icons';
import * as ANT_VALIDATE from '~/views/utils/helpers/ant-validation';
import styled from 'styled-components';
import { authActions } from '~/redux/authUser';
import { connect } from 'react-redux';
import CenterLayout from '~/views/container/components/CenterLayout';
import { parseError } from '~/views/utils/helpers/parseError';

const FormStyled = styled(Form)`
  .ant-form-item-has-success {
    margin-bottom: 0px !important;
  }
`;

function StepOne(props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const onFinish = (values) => {
    setSubmitting(true);
    props.setLogin(values.email);
    props
      .initResetPass(values.email)
      .then((res) => {
        props.setFormError(null);
        setSubmitting(false);
        props.setStep(2);
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
        <UIInputCBP
          name="email"
          isLeft
          label="Email"
          className="w-100"
          placeholder="Nhập vào email của bạn"
          prefix={<MailOutlined size="large" />}
          rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.typeValidate('email'))}
          extra="Hệ thống sẽ gửi Email xác nhận Reset Mật Khẩu của bạn"
        />
        <Form.Item className="align-self-center" style={{ marginTop: '106px' }}>
          <UIPrimaryButton
            style={{ height: '56px', minWidth: '320px', fontSize: '1.2rem' }}
            htmlType="submit"
            loading={submitting}
            title="THAY ĐỔI MẬT KHẨU"></UIPrimaryButton>
        </Form.Item>
      </CenterLayout>
    </FormStyled>
  );
}

export default connect(null, {
  initResetPass: authActions.initResetPass
})(StepOne);
