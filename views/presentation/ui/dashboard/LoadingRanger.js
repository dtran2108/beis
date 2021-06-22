import React from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
  .per-ecom {
    .row {
      border-left: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin: unset !important;
    }

    width: 100%;
  }
  @keyframes placeHolderShimmer {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      background-position: -468px 0;
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      background-position: 468px 0;
    }
  }
  .card-skeleton {
    width: 100%;
    height: 100%;
    position: relative;
    float: left;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;
    -webkit-backface-visibility: hidden;
    background: #fff;
    z-index: 10;
    opacity: 1;
  }

  .card-skeleton.hidden {
    transition: all 0.3s ease-in-out;
    opacity: 0;
    height: 0;
    padding: 0;
  }

  .card-skeleton-img {
    width: 100%;
    height: 120px;
    background: #e6e6e6;
    display: block;
  }

  .animated-background {
    will-change: transform;
    animation: placeHolderShimmer 1s linear infinite forwards;
    -webkit-backface-visibility: hidden;
    background: #e6e6e6;
    background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
    background-size: 800px 104px;
    height: 100%;
    position: relative;
  }

  .skel-mask-container {
    position: relative;
  }

  .skel-mask {
    background: #fff;
    position: absolute;
    z-index: 200;
  }

  .skel-mask-1 {
    width: 70%;
    height: 15px;
    top: 0;
    right: 0;
  }

  .skel-mask-2 {
    width: 100%;
    height: 15px;
    top: 15px;
    right: 0;
  }

  .skel-mask-3 {
    width: 0%;
    height: 12px;
    right: 0;
  }

  .skel-mask-4 {
    top: 50px;
    width: 100%;
    height: 15px;
    right: 0;
  }

  .skel-mask-5 {
    width: 30%;
    height: 24px;
    top: 26px;
    right: 30%;
  }

  .skel-mask-6 {
    width: 74%;
    height: 37px;
    top: 65px;
    right: 0;
  }

  .skel-mask-7 {
    width: 100%;
    height: 13px;
    top: 76px;
    right: 0;
  }
  .item-ecom-loadding {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 150px;
    background: white;
  }
`;
/**
 * viet @params (mess,type,showIcon)
 * type="success"
 * type="info"
 * type="warning"
 * type="error"
 */

const AlertComponent = () => {
  return (
    <Wrap>
      <div className="per-ecom">
        <div className="row">
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>

                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="item-ecom-loadding col-lg-3 col-md-4 col-12">
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-7"></div>

                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default AlertComponent;
