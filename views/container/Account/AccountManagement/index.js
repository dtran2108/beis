import React from 'react';
import { Typography, Row, Col } from 'antd';
import AccountLayout from '~/views/container/AccountLayout';
import AccountInfo from './AccountInfo/index';
import PersonalInfo from './PersonalInfo/index';

export default function AccountManagement() {
  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area gray-bg">
          <AccountLayout>
            <Typography.Title level={2} className="mb-4">
              Quản lý tài khoản
            </Typography.Title>

            <Row justify="space-between" className="mb-4">
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 11 }} xxl={{ span: 11 }}>
                <PersonalInfo />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                <AccountInfo />
              </Col>
            </Row>
          </AccountLayout>
        </div>
      </main>
    </>
  );
}
