import React from 'react';

export default function CardOverlay(props) {
  return (
    <div className="col-inner" {...props}>
      <div className="box has-hover has-hover box-overlay dark box-text-bottom">
        <div className="box-image">
          <div>
            <img
              width={props.width}
              height={props.height}
              src={props.imgSrc}
              className="attachment- size-"
              alt="dangcap5sao"
              loading="lazy"
              srcSet={props.srcSet}
              sizes={props.sizes}
            />
            <div className="overlay" style={{ backgroundColor: 1 }} />
          </div>
        </div>
        <div className="box-text text-center" style={{ backgroundColor: 'rgba(35, 28, 28, 0.7)' }}>
          <div className="box-text-inner">
            <h1 style={{ fontFamily: 'Montserrat' }}>{props.title}</h1>
          </div>
        </div>
      </div>
      <p className="text-center mt-3" style={{ fontSize: '16px', fontFamily: 'Montserrat', color: '#000' }}>
        {props.content}
      </p>
    </div>
  );
}
