import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import { withRouter } from 'next/router';
import { Card, Rate } from 'antd';
// import {pa} from '~/views/utils/helpers'

class ProductFeature extends PureComponent {
  render() {
    const { title, image, minPrice, maxPrice, rate } = this.props;
    return (
      <LazyLoad height={175} throttle={200}>
        <Card
          className="img-lazyload"
          hoverable
          style={{ width: 240 }}
          cover={
            <a href="/productDetail">
              <img alt={title} src={image} />
            </a>
          }>
          <span>{title}</span>
          <h6>
            {minPrice}-{maxPrice}/1kg
          </h6>
          <Rate disabled allowHalf defaultValue={rate} />
        </Card>
      </LazyLoad>
    );
  }
}

export default withRouter(ProductFeature);
