import React from 'react';
import { Drawer, Carousel } from 'antd';
import { UIPrimaryButton, UISecondaryButton } from '~/views/presentation/ui/buttons';
import styled from 'styled-components';
import { useWindowSize } from 'react-use';

const CarouselStyled = styled.div`
  .ant-carousel .slick-dots li.slick-active button {
    background: #000;
  }
  .ant-carousel .slick-dots li button {
    background: gray;
  }
`;

const CartDrawer = (props) => {
  const { width, height } = useWindowSize();
  return (
    <Drawer //
      title={<span style={{ fontSize: '11px' }}>MY BAG (0)</span>}
      placement="right"
      width={width <= 320 ? 320 : 350}
      headerStyle={{ background: '#f5f5f5', textAlign: 'center', fontFamily: 'Brandon Grotesque Medium' }}
      closeIcon={
        <button className="js-toggle-cart cart__mini-cart-toggle">
          <span aria-hidden="true">×</span>
        </button>
      }
      bodyStyle={{ fontSize: '16px' }}
      onClose={() => props.setVisible(false)}
      visible={props.visible}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="w-100 text-center" style={{ fontFamily: 'Brandon Grotesque Medium' }}>
          Your bag is empty.
        </div>
        <div>
          <CarouselStyled>
            <Carousel>
              {[0, 1, 2, 3, 4, 5].map((item, i) => (
                <div key={i}>
                  <div className="row" style={{ height: '135px' }}>
                    <div className="col-3">
                      <img
                        src="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ChangingOrganizer_Blackv_12416_130x.jpg?v=1622092595"
                        data-src="//cdn.shopify.com/s/files/1/0032/3423/4479/products/Beis_ConvertibleWeekender_Beige_12033_500x749_crop_center.jpg?v=1625789726"
                        alt="The Weekender in Beige"
                        className="img-fluid lazyloaded"
                      />
                    </div>
                    <div className="col-9">
                      <div className="mb-3" style={{ fontSize: '16px' }}>
                        The Changing Organizer
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="mr-2" style={{ fontFamily: 'Brandon Grotesque Medium' }}>
                          $38.00
                        </div>
                        <UISecondaryButton size="small" width="68px">
                          ADD
                        </UISecondaryButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </CarouselStyled>
          <div className="cart__subtotal" style={{ fontFamily: 'Brandon Grotesque Medium' }}>
            <span>Subtotal</span>&nbsp;(<span rv-text="cart.item_count">0</span>)
            <span className="float-right" rv-text="cart.total_price | money ">
              $0.00
            </span>
          </div>
          <UIPrimaryButton width="100%">CHECKOUT</UIPrimaryButton>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
