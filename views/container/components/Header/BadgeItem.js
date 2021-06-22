import React from 'react';
import { compose } from 'recompose';
import { Badge, Row, Col, Typography } from 'antd';
import { withRouter } from 'next/router';
import { ShoppingCartOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import UIImage from '~/views/presentation/ui/Image/UIImage';
import _ from 'lodash';
import COLOR from '~/utils/layout/color';

const WrapBadgeItem = styled.div`
  height: auto;
  .anticon,
  .anticon-setting {
    margin-right: 0;
  }
  .header__cart {
    .cart_icon {
      min-width: 25px;
      min-height: 25px;

      font-size: 24px;
    }
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border: 1px solid ${COLOR.divider};
  }

  .badge__item {
    border-radius: 6px;
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

const BadgeItem = ({
  count = 0,
  isIcon = true,
  icon = <PictureOutlined />,
  title = '',
  size = 80,
  sizeImg = 40,
  styleImg,
  handleClick = () => null
}) => {
  return (
    <WrapBadgeItem
      className="mr-2 d-flex flex-column justify-content-start align-items-center"
      style={{ width: size }}
      role="presentation"
      onClick={handleClick}>
      <Badge overflowCount={99} count={count} offset={[0, 35]} className={`${!_.isString(icon) && 'header__cart'}  badge__item`}>
        <div className={`${!_.isString(icon) && 'cart_icon'} d-flex justify-content-center align-items-center`} style={{ width: sizeImg }}>
          {_.isString(icon) && icon.length !== 0 && isIcon ? (
            <UIImage styleImg={styleImg} isIcon={true} src={icon} width={sizeImg} height={isIcon ? 'auto' : sizeImg} />
          ) : (
            icon
          )}
        </div>
      </Badge>
      {title && <Typography.Text>{title}</Typography.Text>}
    </WrapBadgeItem>
  );
};

export default compose(withRouter)(BadgeItem);
