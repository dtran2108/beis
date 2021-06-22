import React from 'react';
import { Row, Col } from 'antd';
import AccountSideMenus from '~/views/container/components/AccountSideMenus';

export default function AccountLayout(props) {
  return (
    <Row className="py-5">
      <Col
        xs={{ span: 22, offset: 2 }}
        sm={{ span: 22, offset: 2 }}
        md={{ span: 4, offset: 2 }}
        lg={{ span: 4, offset: 2 }}
        xl={{ span: 4, offset: 2 }}
        xxl={{ span: 3, offset: 2 }}>
        <AccountSideMenus />
      </Col>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 16 }}
        lg={{ span: 16 }}
        xl={{ span: 16 }}
        xxl={{ span: 15 }}>
        {props.children}
      </Col>
    </Row>
  );
}
