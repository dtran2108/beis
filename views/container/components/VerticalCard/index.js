import React from 'react';

export default function VerticalCard(props) {
  const renderCardContent = (props) => {
    return (
      <div style={{ textAlign: 'center', padding: props.textPadding, fontFamily: 'Montserrat', color: '#000' }}>
        <p style={{ fontSize: '24px', fontWeight: '500' }}>{props.title}</p>
        <p style={{ fontSize: '16px', textAlign: 'center' }}>{props.content}</p>
      </div>
    );
  };

  return (
    <div className={`col-inner text-left p-0 ${!props.isBottom && 'mobile-reverse'}`} {...props}>
      {!props.isBottom && renderCardContent(props)}
      <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_1682004042">
        <div className="img-inner dark">
          <img
            width={1020}
            height={1000}
            src={props.imgSrc}
            className="attachment-large size-large"
            alt=""
            loading="lazy"
            srcSet={props.srcSet}
            sizes="(max-width: 1020px) 100vw, 1020px"
          />
        </div>
      </div>
      {props.isBottom && renderCardContent(props)}
    </div>
  );
}
