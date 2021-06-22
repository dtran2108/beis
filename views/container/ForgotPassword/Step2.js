import React, { useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { UIPrimaryButton } from '~/views/presentation/ui/buttons';
import OtpInput from '~/views/presentation/ui/OTP-input/index';
import styled from 'styled-components';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';
import { authActions } from '~/redux/authUser';
import { connect } from 'react-redux';
import CenterLayout from '~/views/container/components/CenterLayout';
import { parseError } from '~/views/utils/helpers/parseError';
import * as ANT_VALIDATE from '~/views/utils/helpers/ant-validation';

const FormStyled = styled(Form)`
  .ant-form-item-has-success {
    margin-bottom: 0px !important;
  }
`;

function StepTwo(props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const onFinish = (values) => {
    setSubmitting(true);
    const body = { login: props.login, otp: values.otp };
    props
      .confirmOTPResetPass(body)
      .then((res) => {
        props.setFormError(null);
        setSubmitting(false);
        props.setResetKey(res.data.key);
        props.setStep(3);
      })
      .catch((err) => {
        setSubmitting(false);
        props.setFormError(parseError(err));
      });
  };

  const onFinishFailed = (err) => {
    console.error('trandev ~ file: index.js ~ line 13 ~ onFinishFailed ~ err', err);
  };

  const resendOtp = () => {
    setOtpLoading(true);
    props
      .initResetPass(props.login)
      .then((res) => {
        props.setFormError(null);
        setOtpLoading(false);
        message.success('Đã gửi mã OTP thành công');
      })
      .catch((err) => {
        setOtpLoading(false);
        props.setFormError(parseError(err));
      });
  };

  return (
    <FormStyled {...layout} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <CenterLayout className="my-5">
        <Form.Item className="align-self-center" name="otp" rules={ANT_VALIDATE.commonValidate()}>
          <OtpInput OTPLength={6} inputClassName="form-control form-control-solid" otpType="number" />
        </Form.Item>
        <Form.Item className="align-self-center mt-3 d-flex justify-content-end">
          <UISecondaryButton className="me-2 mb-0" onClick={() => resendOtp()} loading={otpLoading} title="Gửi lại OTP" />
          <UIPrimaryButton className="mb-0" htmlType="submit" loading={submitting} title="Tiếp theo"></UIPrimaryButton>
        </Form.Item>
      </CenterLayout>
    </FormStyled>
  );
}

export default connect(null, {
  confirmOTPResetPass: authActions.confirmOTPResetPass,
  initResetPass: authActions.initResetPass
})(StepTwo);
