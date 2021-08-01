import React from 'react';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';

const SummerSection = () => {
  return (
    <>
      <div className="pt-5" style={{ background: '#ebd9c8' }}>
        <div className="temp-container-fluid-restrained temp-z-1 position-relative">
          <div className="row flex-row temp-marg-top--xl">
            <div className="col-md-5 mx-3 mx-md-0">
              <div className="temp-img-txt">
                <div className="image-zoom is-left">
                  <img
                    itemProp="image"
                    data-aspect-ratio="0.575
"
                    style={{ aspectRatio: '0.575' }}
                    className="full-width"
                    alt=""
                    sizes="(min-width: 768px) 50vw, 100vw"
                    srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_640x.jpg?v=1626284177 640w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_750x.jpg?v=1626284177 750w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_828x.jpg?v=1626284177 828w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_1136x.jpg?v=1626284177 1136w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_1334x.jpg?v=1626284177 1334w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_1700x.jpg?v=1626284177 1700w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_2000x.jpg?v=1626284177 2000w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_2300x.jpg?v=1626284177 2300w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image1_8691891a-0335-4e4a-9029-436b1cda4bfb_2600x.jpg?v=1626284177 2600w"
                  />
                </div>
                <div className="temp-img-txt__txt temp-img-txt__txt3 d-none d-lg-block">
                  <div className="temp-img-txt__inner">
                    <div className="temp-img-txt__l1">Practice Safe Travels</div>
                    <div className="temp-img-txt__l2">Your hot summer starts now. Travel is back and sexier than ever.</div>
                    <div className="temp-img-txt__l2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5 mx-3 mx-md-0">
              <div className="temp-overrun-text-2">
                <h2 className="big-header temp-heading-2 temp-marg-1b">Hot BÉIS Summer</h2>
              </div>
              <div className="temp-txt-1 temp-marg-16">
                <p>This summer is all about traveling protected.</p>
              </div>
              <div className="temp-marg-11 mb-5 mb-lg-0">
                <UISecondaryButton width="200px" size="large" className="temp-btn-large mb-md-5">
                  SHOP NOW
                </UISecondaryButton>
              </div>
              <div className="temp-img-border-2 mt-md-5">
                <div className="image-zoom is-right">
                  <img
                    itemProp="image"
                    data-aspect-ratio="0.575
"
                    style={{ aspectRatio: '0.575' }}
                    className="full-width"
                    alt=""
                    sizes="(min-width: 768px) 50vw, 100vw"
                    srcSet="//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_640x.jpg?v=1626284154 640w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_750x.jpg?v=1626284154 750w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_828x.jpg?v=1626284154 828w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_1136x.jpg?v=1626284154 1136w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_1334x.jpg?v=1626284154 1334w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_1700x.jpg?v=1626284154 1700w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_2000x.jpg?v=1626284154 2000w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_2300x.jpg?v=1626284154 2300w,//cdn.shopify.com/s/files/1/0032/3423/4479/files/image2_ca774c1d-1a5a-41ed-95ed-db63b7becb36_2600x.jpg?v=1626284154 2600w"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummerSection;
