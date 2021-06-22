import React from 'react';
import { AOS_DATA } from '~/configs/index';

export default function SectionHeader(props) {
  return (
    <div className={props.layout || 'col small-12 large-12'} data-aos={AOS_DATA.zoomIn} {...props}>
      <div className="col-inner">
        <div className="mb-4" style={{ color: '#000' }}>
          {props.title}
        </div>
        <div className="text-center">
          <div
            className="is-divider divider clearfix"
            style={{
              marginTop: '17.9px',
              marginBottom: '17.9px',
              width: `${props?.dividerWidth || '200px'}`,
              maxWidth: `${props?.dividerWidth || '200px'}`,
              height: '2px',
              backgroundColor: props.dividerColor || 'rgb(0, 0, 0)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
