import React from 'react';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';
import { Typography } from 'antd';
import Rating from '@material-ui/lab/Rating';
import styled from 'styled-components';

const RatingStyled = styled(Rating)`
  .iconFilled {
    color: '#000';
  }
  .iconHover {
    color: '#000';
  }
`;

export default function ProductItem() {
  return (
    <div className="col-6 col-lg-4 plp__item mb-4">
      <div className="plp-item__inner">
        <figure className="plp-item__figure">
          <a href="/collections/featured-collection/products/the-weekender-in-beige">
            <div className="plp-item__figure-inner">
              <span className="plp-item__figure-inner-title"></span>
            </div>
            <div className="plp__item-image product">
              <div className="plp-tag flag--long">BACK IN STOCK</div>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_768x1151_crop_center.jpg?v=1625789726"
                />
                <source
                  media="(min-width: 769px)"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_769x1153_crop_center.jpg?v=1625789726"
                />
                <source
                  media="(min-width: 1200px)"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_1200x1798_crop_center.jpg?v=1625789726"
                />
                <source
                  media="(min-width: 1680px)"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_1680x2519_crop_center.jpg?v=1625789726"
                />
                <img
                  src="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_500x749_crop_center.jpg?v=1625789726"
                  data-src="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_500x749_crop_center.jpg?v=1625789726"
                  alt="The Weekender in Beige"
                  className="img-fluid img-fluid img-100 d-block main-image lazyloaded"
                />
              </picture>
            </div>
          </a>
        </figure>
        <h3 className="plp__item-title">
          <a href="/collections/featured-collection/products/the-weekender-in-beige">
            The Weekender in Beige
            <span className="product-color">
              <span>in </span>Beige
            </span>
          </a>
        </h3>
        <div className="d-flex align-items-center" style={{ position: 'relative', left: '-5px' }}>
          <RatingStyled value={5} readOnly className="mr-3" size="small" />
          <Typography.Link className="text-m" style={{ color: '#000', textDecoration: 'underline' }}>
            8083 Reviews
          </Typography.Link>
        </div>
        <span className="plp__item-price product-price font-weight-bold">
          <b>$54.00</b>
        </span>
      </div>
      <UISecondaryButton width="120px">ADD TO BAG</UISecondaryButton>
    </div>
  );
}
