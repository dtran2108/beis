import React from 'react';
import { compose } from 'recompose';
import { Badge, Row, Col, Typography } from 'antd';
import { withRouter } from 'next/router';
import { ShoppingCartOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import UIImage from '~/views/presentation/ui/Image/UIImage';
import _ from 'lodash';
import COLOR from '~/utils/layout/color';

const WrapHeaderItem = styled.div`
  .anticon,
  .anticon-setting {
    margin-right: 0;
  }

  .header__cart {
    .cart_icon {
      font-size: 24px;
    }
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
  }
  .badge__item {
    :hover {
      background-color: ${COLOR.hover};
      cursor: pointer;
      -webkit-transition: all 0.4s 0.1s ease;
      -moz-transition: all 0.4s 0.1s ease;
      -o-transition: all 0.4s 0.1s ease;
      transition: all 0.4s 0.1s ease;
    }
  }
`;

const HeaderItem = ({
  count = 0,
  isIcon = true,
  icon = <PictureOutlined />,
  title = '',
  size = 80,
  sizeImg = 28,
  handleClick = () => null
}) => {
  return (
    <WrapHeaderItem
      className="mr-2 d-flex justify-content-end align-item-center"
      style={{ width: size, height: size }}
      role="presentation"
      onClick={handleClick}>
      <Badge
        overflowCount={99}
        count={count}
        offset={[-4, 4]}
        className="header__cart badge__item d-flex justify-content-center align-items-center w-100">
        <div className="cart_icon" style={{ width: sizeImg, height: sizeImg }}>
          {_.isString(icon) && icon.length !== 0 && isIcon ? <UIImage isIcon={true} src={icon} width={sizeImg} height={sizeImg} /> : icon}
        </div>
      </Badge>
      {title && <Typography.Text>{title}</Typography.Text>}
    </WrapHeaderItem>
  );
};

export default compose(withRouter)(HeaderItem);
