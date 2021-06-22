import React from 'react';
import AnnounceSectionWrapper from '../AnnounceSectionWrapper';
import { AOS_DATA } from '~/configs/index';

export default function ImgAsideSection(props) {
  const Aside = (props) => (
    <div className="col medium-6 small-12 large-6" {...props}>
      <div className="col-inner">
        <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_80875553">
          <div className="img-inner dark">
            <img
              style={props.imgStyle}
              width={props.imgWidth}
              height={props.imgHeight}
              src={props.imgSrc}
              className="attachment-large size-large"
              alt=""
              loading="lazy"
              srcSet={props.srcSet}
              sizes={props.sizes}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="row">
      {props.left && <Aside data-aos={AOS_DATA.fadeRight} {...props} />}
      <div className="col medium-6 small-12 large-6">
        <AnnounceSectionWrapper
          title={
            <p className="mb-2" style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '32px' }}>
              {props.title}
            </p>
          }>
          {props.itemList.map((item, i) => (
            <div
              key={i}
              className="icon-box featured-box icon-box-left text-left my-4"
              data-aos={props.isLeft ? AOS_DATA.fadeLeft : AOS_DATA.fadeRight}>
              <div className="icon-box-img" style={{ width: '24px' }}>
                <div className="icon">
                  <div className="icon-inner">
                    <img
                      width={24}
                      height={24}
                      src="/vninturist-assets/wp-content/uploads/2021/01/icon-6-300x259.png"
                      className="attachment-medium size-medium"
                      alt=""
                      loading="lazy"
                      srcSet="/vninturist-assets/wp-content/uploads/2021/01/icon-6-300x259.png 300w, /vninturist-assets/wp-content/uploads/2021/01/icon-6.png 512w"
                      sizes="(max-width: 300px) 100vw, 300px"
                    />
                  </div>
                </div>
              </div>
              <div className="icon-box-text last-reset" style={{ fontFamily: 'Montserrat', color: '#000' }}>
                {item?.title && <h3 style={{ fontWeight: 500 }}>{item.title}</h3>}
                <p style={{ fontWeight: 100 }}>{item.content}</p>
              </div>
            </div>
          ))}
        </AnnounceSectionWrapper>
      </div>
      {!props.left && <Aside data-aos={AOS_DATA.fadeLeft} {...props} />}
    </div>
  );
}
