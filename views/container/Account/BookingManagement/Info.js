/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AccountCardStyled from '~/views/container/components/AccountCardStyled';
import { Form, Select, Typography, Spin } from 'antd';
import styled from 'styled-components';
import { packageActions } from '~/redux/package';
import { hotelActions } from '~/redux/hotel';

const { Option } = Select;

const FormItemStyled = styled(Form.Item)`
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
    border-radius: 3px;
    border: solid 1px #707070;
    background-color: #f6f6f6;
  }
  .ant-select-selector {
    background-color: #fff !important;
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: #fff !important;
    box-shadow: none !important;
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #fff;
  }
  .ant-select-arrow {
    color: #000;
  }
`;

const TailFormItemStyled = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const BookingInfo = (props) => {
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [hotelLoading, setHotelLoading] = useState(false);
  const [packagesLoading, setPackagesLoading] = useState(false);

  const layout = {
    labelCol: {
      md: { span: 24 },
      lg: { span: 6 },
      xl: { span: 4 }
    },
    wrapperCol: {
      md: { span: 24 },
      lg: { span: 18 },
      xl: { span: 19 }
    }
  };
  const tailLayout = {
    wrapperCol: {
      md: { offset: 0, span: 24 },
      lg: { offset: 6, span: 18 },
      xl: { offset: 4, span: 19 }
    }
  };

  //---------------------------------------------------------
  // LOAD DATA
  //---------------------------------------------------------
  useEffect(() => {
    setHotelLoading(true);
    props
      .getHotels()
      .then((res) => {
        setHotels(res.data);
        setHotelLoading(false);
      })
      .catch((err) => {
        console.error('trandev ~ file: Info.js ~ line 73 ~ useEffect ~ err', err);
        setHotelLoading(false);
      });
  }, []);

  useEffect(() => {
    setPackagesLoading(true);
    props
      .getPackages()
      .then((res) => {
        setPackages(res.data);
        setPackagesLoading(false);
      })
      .catch((err) => {
        console.error('trandev ~ file: Info.js ~ line 73 ~ useEffect ~ err', err);
        setPackagesLoading(false);
      });
  }, []);
  //---------------------------------------------------------
  // LOAD DATA
  //---------------------------------------------------------

  return (
    <AccountCardStyled title="Thông tin Booking" bordered={false}>
      <Form {...layout} labelAlign="left">
        <FormItemStyled label="Chọn CSLT">
          <Select
            notFoundContent={hotelLoading ? <Spin /> : null}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {hotels.map((hotel, i) => (
              <Option key={i} value={hotel.id}>
                {hotel.name}
              </Option>
            ))}
          </Select>
        </FormItemStyled>
        <FormItemStyled label="Chọn sản phẩm">
          <Select
            notFoundContent={packagesLoading ? <Spin /> : null}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {packages.map((p, i) => (
              <Option key={i} value={p.id}>
                {p.name}
              </Option>
            ))}
          </Select>
        </FormItemStyled>
        <TailFormItemStyled {...tailLayout}>
          <Typography style={{ width: 'fit-content' }}>Số dư còn lại: 30.000.000</Typography>
          <Typography style={{ width: 'fit-content' }}>Số dư khả dụng: 10.000.000</Typography>
        </TailFormItemStyled>
      </Form>
    </AccountCardStyled>
  );
};

export default connect((state) => ({ state }), {
  getHotels: hotelActions.getHotels,
  getPackages: packageActions.getPackages
})(BookingInfo);
