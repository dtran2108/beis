import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Input, Select, DatePicker, Typography, Divider, InputNumber, message, Button } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { UIPrimaryButton } from '~/presentation/ui/buttons';
import { connect } from 'react-redux';
import { hotelActions } from '~/redux/hotel';
import { bookingActions } from '~/redux/booking';
import { head } from 'lodash';
import * as ANT_VALIDATE from '~/views/utils/helpers/ant-validation';

const CardStyled = styled(Card)`
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  .ant-card-head-title {
    font-size: 24px;
    color: #074494;
    font-weight: bold;
  }
`;

const InputNumberStyled = styled(InputNumber)`
  input {
    margin: 0 !important;
  }
`;

const DatePickerStyled = styled(DatePicker)`
  input {
    margin: 0 !important;
  }
`;

const { TextArea } = Input;

const TransferForm = (props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [hotelList, setHotelList] = useState([]);
  const [roomTypeOptions, setRoomTypeOptions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  useEffect(() => {
    // set balance fields
    form.setFieldsValue({ remainingBalance: 1000000, yearAvailableBalance: 10000000 });
    props
      .getHotels()
      .then((res) => {
        setHotelList(res.data);
      })
      .catch((err) => {
        console.error('trandev ~ file: Form.js ~ line 34 ~ useEffect ~ err', err);
      });
  }, []);

  //----------------------
  // FORM SUBMITING
  //----------------------
  const onFinish = (values) => {
    setSubmitting(true);
    const body = { ...values };
    props
      .createBooking(body)
      .then((res) => {
        router.push('/');
        message.success('Đặt phòng thành công');
        setSubmitting(false);
      })
      .catch((err) => {
        console.error('trandev ~ file: Form.js ~ line 64 ~ onFinish ~ err', err);
        setSubmitting(false);
      });
  };

  const onFinishFailed = (err) => {
    console.error('trandev ~ file: Form.js ~ line 29 ~ onFinishFailed ~ err', err);
  };
  //----------------------
  // FORM SUBMITING
  //----------------------

  return (
    <CardStyled
      title="THÔNG TIN CHUYỂN NHƯỢNG"
      extra={
        <Button className="m-0 p-0" type="link">
          Xem lịch sử chuyển nhượng
        </Button>
      }>
      <Form {...layout} form={form} className="d-flex flex-column" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="receiverName" label="Họ và tên người được chuyển nhượng" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="receiverId" label="Số ID người được chuyển nhượng" hasFeedback rules={ANT_VALIDATE.commonValidate()}>
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại liên hệ"
          rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.phoneValidate())}
          hasFeedback>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={ANT_VALIDATE.commonValidate().concat(ANT_VALIDATE.typeValidate('email'))} hasFeedback>
          <Input size="large" />
        </Form.Item>

        <Typography.Title className="ant-card-head-title m-0">THÔNG TIN THẺ</Typography.Title>
        <Divider className="mt-0" />

        <Form.Item name="name" label="Họ và tên người nhận phòng" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="certificate" label="Số CMND" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="notes" label="Ghi chú">
          <TextArea size="large" rows={6} />
        </Form.Item>

        <Form.Item className="align-self-center m-0">
          <UIPrimaryButton
            style={{ width: '100%', fontSize: '24px' }}
            htmlType="submit"
            loading={submitting}
            title="GỬI YÊU CẦU CHUYỂN NHƯỢNG"></UIPrimaryButton>
        </Form.Item>
      </Form>
    </CardStyled>
  );
};

export default connect(
  (state) => ({
    state: state
  }),
  {
    getHotels: hotelActions.getHotels,
    createBooking: bookingActions.createBooking
  }
)(TransferForm);
