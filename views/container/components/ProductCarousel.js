import React from 'react';
import { Carousel, Typography } from 'antd';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';
import { LeftArrow, RightArrow } from '~/assets/svg';

const ProductCarousel = (props) => {
  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ];

  return (
    <Carousel //
      slidesToShow={3}
      arrows
      dots={false}
      responsive={responsiveSettings}
      prevArrow={<LeftArrow />}
      nextArrow={<RightArrow />}>
      {(props.data || []).map((item, i) => (
        <div key={i}>
          <div className="d-flex flex-column align-items-center justify-content-between" style={{ height: '500' }}>
            <img width="300" height="300" src={item.imgSrc} alt="item" />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Typography.Title level={3} className="mb-3">
                {item.title}
              </Typography.Title>
              <Typography.Text style={{ fontSize: '18px', fontWeight: '800' }} strong className="mb-3">
                {item.price}
              </Typography.Text>
              <UISecondaryButton width="240px" size="large">
                <b>ADD TO BAG</b>
              </UISecondaryButton>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
