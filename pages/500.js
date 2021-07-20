import React from 'react';

import { Result, Button } from 'antd';
import Router from 'next/router';

export default function Custom404() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, the page you visited error."
      extra={
        <Button type="primary" onClick={() => Router.router.push('/')}>
          Back Home
        </Button>
      }
    />
  );
}
