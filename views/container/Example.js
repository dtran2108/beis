import React from 'react';
import Link from 'next/link';
import { Button, Typography } from 'antd';

import styled from 'styled-components';

/// alway dynamic import for component large
import dynamic from 'next/dynamic';
const DynamicComponent3WithNoSSR = dynamic(() => import('./DynamicComponent'), { loading: () => <p>Loading ...</p>, ssr: false });

const Box = styled.div`
  color: yellow;
`;
function Example(props) {
  return (
    <div className="example-page container mx-auto  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 w-full p-4">
      <Typography.Title level={2} className="text-center text-pink-200">
        This is my example page
      </Typography.Title>
      <Button type="primary">Abc</Button>
      <div className="text-center sm:text-left" style={{ fontSize: '20px' }}>
        {'message:message'}
      </div>
      <Box>text-yellow</Box>
      <div className="d-flex justify-content-center">
        <DynamicComponent3WithNoSSR></DynamicComponent3WithNoSSR>
        <div className="btn mr-3">
          <Link href="/example" locale="en">
            Tiếng anh
          </Link>
        </div>
        <div className="btn mr-3">
          <Link href="/example" locale="vi" className="btn ">
            Vietnamese
          </Link>
        </div>
      </div>
      <Link href="example/5">
        <a>example detail</a>
      </Link>
      <div className="flex justify-center">
        <div className="w-32 h-32 my-4 mx-12  bg-purple-100 rounded-full animate-bounce  shadow-2xl"></div>
        <div className="w-32 h-32 my-4 mx-12  bg-purple-100 rounded-full animate-ping "></div>
        <div className="w-32 h-32 my-4 mx-12  bg-purple-100 rounded-full animate-pulse  "></div>
      </div>

      <div className="flex flex-wrap ">
        <div className="flex-grow bg-gray-600 p-2 text-center order-2 text-white ">1</div>
        <div className="flex-grow bg-green-400 p-2 text-center order-3 text-white shadow-2xl">2</div>
        <div className="flex-grow bg-blue-400 p-2 text-center order-1 text-white ">3</div>
      </div>

      <div className="mt-5">
        {props?.provinces?.map((pro, i) => (
          <div key={i}>{`${pro.id} ${pro.name}`}</div>
        ))}
      </div>
    </div>
  );
}

export default Example;
