import React, { PureComponent } from 'react';
import Swiper from 'swiper';
import styled from 'styled-components';
import { getArray, getNumber } from '~/utils/helpers/utilObject';
import _ from 'lodash';

const WrapperBanner = styled.div`
  .swiper-slide {
    div.ant-col {
      min-width: 100%;
    }
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
class OwlCarousel extends PureComponent {
  state = { isUpdated: false };

  componentDidMount() {
    const { config } = this.props;
    new Swiper(`.${config.type}`, config.options);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { config } = this.props;
    if (getNumber(_.head(nextProps.listItem), 'id', -1) !== getNumber(_.head(this.props.listItem), 'id', -2)) {
      new Swiper(`.${config.type}`, config.options);
    }
  }

  render() {
    const { listItem, config, allowArrow, allowPagination } = this.props;

    return (
      <WrapperBanner>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {listItem &&
              getArray(listItem, undefined, []).map((item, index) => (
                <div className="swiper-slide" key={index}>
                  {item}
                </div>
              ))}
          </div>
          {allowPagination && <div className="swiper-pagination"></div>}
          {allowArrow && <div className="swiper-button-prev"></div>}
          {allowArrow && <div className="swiper-button-next"></div>}
        </div>
      </WrapperBanner>
    );
  }
}

OwlCarousel.defaultProps = {
  config: {
    type: 'multi-banner-slide',
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    options: {
      autoplay: {
        delay: 5000
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      loop: false
    }
  }
};
export default OwlCarousel;
