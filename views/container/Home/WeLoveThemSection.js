import React from 'react';
import { Carousel, Typography } from 'antd';
import { UISecondaryButton } from '~/presentation/ui/buttons';

const WeLoveThemSection = () => {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  };

  return (
    <>
      <div id="shopify-section-homepage-new-promo-2" className="shopify-section">
        <div data-section-id="homepage-new-promo-2" data-section-type="homepage-new-promo-2">
          <div className="temp-fullscreen-promo temp-pull-1 temp-txt-light" style={{ marginTop: '-510px' }}>
            <div className="temp-fullscreen-promo__img object-fit object-fit--cover image-zoom">
              <picture>
                <source
                  sizes="100vw"
                  media="(orientation: portrait)"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_640x.jpg?v=1626285131 640w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_750x.jpg?v=1626285131 750w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_828x.jpg?v=1626285131 828w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_1136x.jpg?v=1626285131 1136w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_1334x.jpg?v=1626285131 1334w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_1700x.jpg?v=1626285131 1700w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_2000x.jpg?v=1626285131 2000w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_2300x.jpg?v=1626285131 2300w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mooodmobile2_2600x.jpg?v=1626285131 2600w"
                />
                <source
                  sizes="100vw"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_640x.jpg?v=1626285158 640w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_750x.jpg?v=1626285158 750w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_828x.jpg?v=1626285158 828w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_1136x.jpg?v=1626285158 1136w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_1334x.jpg?v=1626285158 1334w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_1700x.jpg?v=1626285158 1700w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_2000x.jpg?v=1626285158 2000w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_2300x.jpg?v=1626285158 2300w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_2600x.jpg?v=1626285158 2600w"
                />
                <img
                  data-aspect-ratio="1.5802469135802468
"
                  style={{ aspectRatio: '1.5802469135802468' }}
                  className="object-fit__object full-width"
                  srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/files/mood2_c5be5e6b-981a-4fc2-990d-47ecf4f5fa78_2000x.jpg?v=1626285158"
                  alt=""
                />
              </picture>
            </div>
          </div>
        </div>
        <div className="temp-text-image__htext text-center">
          <h2 className="big-header temp-heading-2">Now, We’re Fully Tripping!</h2>
        </div>
      </div>
      <div className="temp-container-fluid-restrained" style={{ marginTop: '150px' }}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="text-center">
              <div className="temp-marg-6">
                <div className="big-header temp-heading-4">We love them, so do you!</div>
              </div>
              <div className="temp-marg-7 temp-txt-2">
                <p />
                <p>Boasting 5-star reviews and thousands of likes, these styles have earned their badge as best-selling BÉIS-ics.</p>
                <p />
              </div>
            </div>
          </div>
          <div className="col-md-3" />
        </div>
        <div className="container-fluid" style={{ marginBottom: '220px' }}>
          <Carousel
            slidesToShow={3}
            arrows
            dots={false}
            responsive={[
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
            ]}
            prevArrow={
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 53 53"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <g
                    id="icon-arrow-thin-left"
                    transform="translate(26.500000, 26.500000) rotate(180.000000) translate(-26.500000, -26.500000) "
                    fill="#000000"
                    fillRule="nonzero">
                    <g id="Path" transform="translate(26.500000, 26.500000) rotate(90.000000) translate(-26.500000, -26.500000) ">
                      <polygon points="27.174 4.155 27.174 53 24.928 53 24.928 4.155 1.572 27.623 0 26.051 26.051 0 52.1 26.051 50.64 27.623" />
                    </g>
                  </g>
                </g>
              </svg>
            }
            nextArrow={
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 53 53"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                {/* Generator: Sketch 53.2 (72643) - https://sketchapp.com */}
                <title>icon-arrow-right</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <g id="icon-arrow-right" fill="#000000" fillRule="nonzero">
                    <g transform="translate(26.500000, 26.500000) rotate(90.000000) translate(-26.500000, -26.500000) " id="Path">
                      <polygon points="27.174 4.155 27.174 53 24.928 53 24.928 4.155 1.572 27.623 0 26.051 26.051 0 52.1 26.051 50.64 27.623" />
                    </g>
                  </g>
                </g>
              </svg>
            }>
            {[0, 1, 2, 3].map((item, i) => (
              <div key={i}>
                <div className="d-flex flex-column align-items-center justify-content-between" style={{ height: '500' }}>
                  <img
                    width="300"
                    height="300"
                    src="https://cdn.shopify.com/s/files/1/0032/3423/4479/products/weekender_black_1700x.jpg?v=1625739239"
                    alt="item"
                  />
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <Typography.Title level={3} className="mb-3">
                      The Weekender in Black
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: '18px', fontWeight: '800' }} strong className="mb-3">
                      $98.00
                    </Typography.Text>
                    <UISecondaryButton width="240px" size="large">
                      <b>ADD TO BAG</b>
                    </UISecondaryButton>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default WeLoveThemSection;
