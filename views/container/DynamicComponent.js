import { Typography } from 'antd';
import React from 'react';

function Example(props) {
  return (
    <div className="example-page container mx-auto  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full p-4">
      <Typography.Title level={2} className="text-center text-pink-200">
        This is my example dynamic component
      </Typography.Title>
    </div>
  );
}

export default Example;
