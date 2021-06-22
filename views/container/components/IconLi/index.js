import React from 'react';

export default function IconLi(props) {
  return (
    <div className="icon-box featured-box icon-box-left text-left my-4" {...props}>
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
        {props.children}
      </div>
    </div>
  );
}
