import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Input, Select, DatePicker, Typography, Divider, InputNumber, message } from 'antd';
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

const BookingForm = (props) => {
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

  //-------------------------------
  // HANDLE SPECIAL FORM ITEM CHANGE
  //-------------------------------
  const handleHotelChange = (value) => {
    setSelectedHotel(head(hotelList.filter((hotel) => hotel.id + '' === value + '')));
    setRoomTypeOptions(
      head(hotelList.filter((hotel) => hotel.id + '' === value + '')).roomType.map((r, i) => {
        return { label: r, value: i };
      })
    );
    form.setFieldsValue({ hotelName: value });
  };

  const handleRoomTypeChange = (value) => {
    form.setFieldsValue({ priceUpRoom: selectedHotel.upgradeFee * (value + 1) });
    form.setFieldsValue({ roomType: value });
  };
  //-------------------------------
  // HANDLE SPECIAL FORM ITEM CHANGE
  //-------------------------------

  return (
    <CardStyled title="THÔNG TIN BOOKING">
      <Form {...layout} form={form} className="d-flex flex-column" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="hotelName" label="Chọn cơ sở lưu trú" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
          <Select
            onChange={handleHotelChange}
            size="large"
            options={(hotelList || []).map((hotel) => {
              return { label: hotel.name, value: hotel.id };
            })}
          />
        </Form.Item>
        <Form.Item name="remainingBalance" label="Số dư còn lại" hasFeedback>
          <InputNumberStyled
            size="large"
            readOnly
            className="w-100"
            min={0}
            max={Number.MAX_SAFE_INTEGER}
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item name="yearAvailableBalance" label="Số dư khả dụng trong năm 2021" hasFeedback>
          <InputNumberStyled
            size="large"
            readOnly
            className="w-100"
            min={0}
            max={Number.MAX_SAFE_INTEGER}
            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Row justify="space-between">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 11 }}>
            <Form.Item name="checkIn" label="Check in" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
              <DatePickerStyled size="large" className="w-100" placeholder="" />
            </Form.Item>
            <Form.Item name="adults" label="Số người lớn" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
              <InputNumberStyled
                size="large"
                className="w-100"
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 11 }}>
            <Form.Item name="checkOut" label="Check out" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
              <DatePickerStyled size="large" className="w-100" placeholder="" />
            </Form.Item>
            <Form.Item name="children" label="Số trẻ em" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
              <InputNumberStyled
                size="large"
                className="w-100"
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="roomType" label="Loại phòng" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
          <Select size="large" options={roomTypeOptions} onChange={handleRoomTypeChange} />
        </Form.Item>

        <Row justify="space-between">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 11 }}>
            <Form.Item name="roomCount" label="Số phòng đặt" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
              <InputNumberStyled
                size="large"
                className="w-100"
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 11 }}>
            <Form.Item name="priceUpRoom" label="Phí nâng hạng phòng">
              <InputNumberStyled
                readOnly
                size="large"
                className="w-100"
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Typography.Title className="ant-card-head-title m-0">THÔNG TIN CÁ NHÂN</Typography.Title>
        <Divider className="mt-0" />

        <Form.Item name="name" label="Họ và tên người nhận phòng" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
          <Input size="large" />
        </Form.Item>
        <Form.Item name="certificate" label="Số CMND" rules={ANT_VALIDATE.commonValidate()} hasFeedback>
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
        <Form.Item name="notes" label="Ghi chú">
          <TextArea size="large" rows={6} />
        </Form.Item>

        <Form.Item className="align-self-center m-0">
          <UIPrimaryButton
            htmlType="submit"
            style={{ width: '100%', fontSize: '24px' }}
            loading={submitting}
            title="BOOK NOW"></UIPrimaryButton>
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
)(BookingForm);
