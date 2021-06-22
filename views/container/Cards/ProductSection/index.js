import React, { useState, useEffect } from 'react';
import IconLi from '~/views/container/components/IconLi';
import { UIPrimaryButton } from '~/presentation/ui/buttons';
import styled from 'styled-components';

const MobileStyled = styled.div`
  @media (max-width: 426px) {
    .mobile-reverse {
      display: flex !important;
      flex-direction: column-reverse !important;
    }
  }
`;

export default function ProductSection(props) {
  const RightImgSide = (props) => {
    return (
      <div className="py-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-3">
            <h1 className="mb-4 ml-4">
              <b>{props.title}</b>
            </h1>
            {props.descriptions.map((d, i) => (
              <IconLi key={i}>{d}</IconLi>
            ))}
            <h1 className="ml-4 mt-4">
              Giá sản phẩm: <b>{`${props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} Đ`}</b>
            </h1>
          </div>
          <div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
            <img src={props.imgUrl} width={400} height={250} alt={props.title} />
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center align-items-center">
          <UIPrimaryButton title="SỠ HỮU NGAY" style={{ width: '300px', fontSize: '24px' }} />
        </div>
      </div>
    );
  };

  const LeftImgSide = (props) => {
    return (
      <MobileStyled className="py-5 primary-linear-bg">
        <div className="row mobile-reverse">
          <div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
            <img src={props.imgUrl} width={400} height={250} alt={props.title} />
          </div>
          <div className="col-lg-6 col-md-6 mb-3">
            <h1 className="mb-4 ml-4" style={{ color: 'white' }}>
              <b>{props.title}</b>
            </h1>
            {props.descriptions.map((d, i) => (
              <IconLi key={i}>
                <span style={{ color: 'white' }}>{d}</span>
              </IconLi>
            ))}
            <h1 className="ml-4 mt-4" style={{ color: 'white' }}>
              Giá sản phẩm: <b>{`${props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} Đ`}</b>
            </h1>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center align-items-center">
          <UIPrimaryButton title="SỠ HỮU NGAY" style={{ width: '300px', fontSize: '24px' }} />
        </div>
      </MobileStyled>
    );
  };

  return <>{props.isLeft ? <LeftImgSide {...props} /> : <RightImgSide {...props} />}</>;
}
