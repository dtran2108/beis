import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import { IMG_URL } from '~/configs';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';
import { getString, getArray, getNumber } from '~/utils/helpers/utilObject';

class ProductCarousel extends PureComponent {
  render() {
    const { itemData } = this.props;
    const mapImages = _.first(getArray(getString(itemData, 'images').split('|')));
    return (
      <div className="swiper-slide">
        <a href={`/category?id=${getNumber(itemData, 'id') || 1}`}>
          <div className="d-flex flex-column item-carousel align-items-center">
            <LazyLoad>
              <div className="sizeImage d-flex">
                <img src={`${IMG_URL}/${mapImages}`} className="img-lazyload" alt={getString(itemData, 'name') || ''} />
              </div>
            </LazyLoad>
            <span>{getString(itemData, 'name') || ''}</span>
          </div>
        </a>
      </div>
    );
  }
}

ProductCarousel.propType = {};

ProductCarousel.defaultProps = {};

export default withRouter(ProductCarousel);
