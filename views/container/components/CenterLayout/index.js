import React from 'react';
import { Row, Col } from 'antd';

function CenterLayout(props) {
  return (
    <Row {...props}>
      <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 6 }} xl={{ span: 8 }} xxl={{ span: 8 }}></Col>
      <Col
        xs={{ span: 20 }}
        sm={{ span: 20 }}
        md={{ span: 20 }}
        lg={{ span: 12 }}
        xl={{ span: 8 }}
        xxl={{ span: 8 }}
        className="d-flex flex-column">
        {props.children}
      </Col>
      <Col xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 6 }} xl={{ span: 8 }} xxl={{ span: 8 }}></Col>
    </Row>
  );
}

export default CenterLayout;
