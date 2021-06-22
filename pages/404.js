import { Result, Button } from 'antd';
import Router from 'next/router';

export default function Custom404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => Router.router.push('/')}>
          Back Home
        </Button>
      }
    />
  );
}
