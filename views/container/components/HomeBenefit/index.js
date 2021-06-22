import React from 'react';

export default function HomeBenefit(props) {
  return (
    <>
      <div className="col medium-4 small-12 large-4" {...props}>
        <div className="col-inner">
          <div className="icon-box featured-box icon-box-center text-center">
            <div className="icon-box-img" style={{ width: '125px' }}>
              <div className="icon">
                <div className="icon-inner">
                  <img
                    width={300}
                    height={259}
                    src={props.imgSrc}
                    className="attachment-medium size-medium"
                    alt=""
                    loading="lazy"
                    srcSet={props.imgSrcSet}
                    sizes="(max-width: 300px) 100vw, 300px"
                  />
                </div>
              </div>
            </div>
            <div className="icon-box-text last-reset d-flex flex-column justify-content-center align-items-center">
              <div className="style-title">
                <b>{props.title}</b>
              </div>
              <hr className="style-hr" />
              {props.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
