import React from 'react';
import { compose } from 'recompose';
import { Carousel, Row } from 'antd';
import UIImage from '~/views/presentation/ui/Image/UIImage';
import { getString } from '~/views/utils/helpers/utilObject';
import styled from 'styled-components';
import COLOR from '~/views/utils/layout/color';

import { Typography } from 'antd';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { ICONS } from '~/configs/icons';
// import UIBanner from '~/views/presentation/ui/Image/UIBanner';

const WrapStore = styled.div`
  border-radius: 8px;
  background: ${COLOR.light};
  .icon-title {
    svg {
      font-size: 25px;
    }
  }
  .ant-typography {
    color: ${COLOR.titleCart};
  }

  .box {
    position: relative;
    background: #fff;
    border-radius: 8px;
    border: 1px solid ${COLOR.dividerImgCart};
  }
  .box:before {
    content: '';
    float: left;
    padding-top: 100%; /* initial ratio of 1:1*/
  }
  .content {
    float: left;
  }
  .title_store {
    background: ${COLOR.shopItemBackground};
    padding: 8px;
    border-radius: 8px;
  }
`;

const TitlePayment = ({ isDefaultImg = false, src = ICONS.shop_square, width = 40, title = '' }) => {
  return (
    <WrapStore className="w-100 p-1">
      <Row justify="start" align="middle">
        {isDefaultImg === false ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="content">
              <UIImage width={width} src={src} />
            </div>
          </div>
        ) : (
          <UIImage width={width} src={src} styleImg={{ borderRadius: 8 }} />
        )}
        <Typography.Title level={5} className="ml-2">
          {title}
        </Typography.Title>
      </Row>
    </WrapStore>
  );
};

export async function getStaticProps({ preview = null }) {
  return { props: { preview } };
}

export default compose()(TitlePayment);
