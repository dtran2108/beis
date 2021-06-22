import React from 'react';
import { compose } from 'recompose';
import { Carousel } from 'antd';
import UIImage from '~/views/presentation/ui/Image/UIImage';
import { getObject, getString } from '~/views/utils/helpers/utilObject';
import styled from 'styled-components';
import COLOR from '~/views/utils/layout/color';

import { Typography } from 'antd';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { parseObjToQuery } from '~/utils/helpers';

// import UIBanner from '~/views/presentation/ui/Image/UIBanner';

const WrapTitle = styled.div`
  .icon-title {
    svg {
      font-size: 25px;
    }
  }
  .ant-typography {
    color: ${COLOR.boldText};
  }
  .view-more {
    color: ${COLOR.primaryText};
  }
`;

const TitleSection = ({ icon = '', title = '', extra = { name: '', link: '/' } }) => {
  return (
    <WrapTitle className="mt-4 title-section">
      <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex justify-content-start align-items-end mr-2 title_section">
          {icon && <div className="mr-1 icon-title">{icon}</div>}

          <Typography.Title level={4} className="mb-0">
            {title}
          </Typography.Title>
        </div>
        {(extra && (
          <Link href={extra.link} className="ml-2">
            <Typography.Link className="view-more d-flex justify-content-start align-items-center ml-2">
              {extra.name} {extra.name && <RightOutlined />}
            </Typography.Link>
          </Link>
        )) ||
          ''}
      </div>
      <Divider style={{ margin: '8px 0 16px 0' }} />
    </WrapTitle>
  );
};

export default compose()(TitleSection);
