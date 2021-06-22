import React from 'react';
import { compose } from 'recompose';
import { Carousel } from 'antd';
import UIImage from '~/views/presentation/ui/Image/UIImage';
import { getString } from '~/views/utils/helpers/utilObject';
import styled from 'styled-components';
import COLOR from '~/views/utils/layout/color';

import { Typography } from 'antd';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

// import UIBanner from '~/views/presentation/ui/Image/UIBanner';

const WrapTitleCart = styled.div`
  .icon-title {
    svg {
      font-size: 25px;
    }
  }
  .ant-typography {
    color: ${COLOR.titleCart};
  }
`;

const TitleCart = ({ icon = '', title = '', extra = { name: '', link: '/' }, isDivider = true }) => {
  return (
    <WrapTitleCart className="w-100">
      <div className="d-flex justify-content-center align-items-end">
        <div className="d-flex justify-content-start align-items-end mr-2">
          {icon && <div className="mr-1 icon-title">{icon}</div>}
          <Typography.Title level={4} className="mb-0">
            {title}
          </Typography.Title>
        </div>
        {(extra && (
          <Link href={extra.link} className="ml-2">
            <Typography.Link href={extra.link} className="d-flex justify-content-start align-items-center ml-2">
              {extra.name} {extra.name && <RightOutlined />}
            </Typography.Link>
          </Link>
        )) ||
          ''}
      </div>
      {isDivider && <Divider style={{ margin: '8px 0 16px 0' }} />}
    </WrapTitleCart>
  );
};

export async function getStaticProps({ preview = null }) {
  return { props: { preview } };
}

export default compose()(TitleCart);
