/* eslint-disable react/display-name */
import React from 'react';
import { Typography, Row, Col } from 'antd';
import AccountLayout from '~/views/container/AccountLayout';
import BookingInfo from './Info';
import BookingHistory from './History';

const BookingManagement = () => {
  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area gray-bg">
          <AccountLayout>
            <Typography.Title level={2} className="mb-4">
              Quản lý Booking
            </Typography.Title>
            <Row className="mb-3">
              <Col span={24}>
                <BookingInfo />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <BookingHistory />
              </Col>
            </Row>
          </AccountLayout>
        </div>
      </main>
    </>
  );
};

export default BookingManagement;
