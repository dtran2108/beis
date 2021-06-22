import React from 'react';

export default function FeatureHeader(props) {
  return (
    <div className="row row-full-width align-center title-header-booking primary-linear-bg" id="row-2128362984">
      <div className="col small-12 large-12 p-0">
        <div className="col-inner text-center py-2">
          <h2 className="feature-title" style={{ fontFamily: 'Montserrat' }}>
            {props.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
