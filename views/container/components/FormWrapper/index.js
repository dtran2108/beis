import React from 'react';
import { Row, Col } from 'antd';

export default function FormWrapper(props) {
  return (
    <Row className="py-5">
      <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }} xl={{ span: 4 }} xxl={{ span: 4 }}></Col>
      <Col
        xs={{ span: 20 }}
        sm={{ span: 20 }}
        md={{ span: 20 }}
        lg={{ span: 16 }}
        xl={{ span: 16 }}
        xxl={{ span: 16 }}
        className="d-flex flex-column">
        {props.children}
      </Col>
      <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }} xl={{ span: 4 }} xxl={{ span: 4 }}></Col>
    </Row>
  );
}
