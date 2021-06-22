/* eslint-disable react/display-name */
import React from 'react';
import { Typography, Row, Col } from 'antd';
import AccountLayout from '~/views/container/AccountLayout';
import CardInfo from './CardInfo';
import TransactionHistory from './TransactionHistory';

const ProductManagement = () => {
  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area gray-bg">
          <AccountLayout>
            <Typography.Title level={2} className="mb-4">
              Quản lý sản phẩm
            </Typography.Title>
            <Row className="mb-3">
              <Col span={24}>
                <CardInfo />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <TransactionHistory />
              </Col>
            </Row>
          </AccountLayout>
        </div>
      </main>
    </>
  );
};

export default ProductManagement;
