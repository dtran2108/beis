import React from 'react';
import SectionHeader from '~/views/container/components/SectionHeader';
import { AOS_DATA } from '~/configs/index';

const PrizeSection = (props) => {
  return (
    <section {...props}>
      <div className="row text-center mb-2">
        <SectionHeader
          layout="col-12"
          dividerWidth="200px"
          title={
            <h1 className="mb-2" style={{ textAlign: 'center', fontSize: '30px', color: '#000' }}>
              CÁC GIẢI THƯỞNG
            </h1>
          }
        />
      </div>
      <div className="row">
        {[1, 2, 3].map((n, i) => (
          <div key={i} className="col-12 col-md-4 col-lg-4 d-flex justify-content-center" data-aos={AOS_DATA.zoomIn}>
            <img
              width="250"
              height="250"
              src={`/vninturist-assets/wp-content/uploads/2020/12/award-${n}.png`}
              className="attachment-large size-large"
              alt=""
              loading="lazy"
              srcSet={`/vninturist-assets/wp-content/uploads/2020/12/award-${n}.png 250w, /vninturist-assets/wp-content/uploads/2020/12/award-${n}-150x150.png 150w`}
              sizes="(max-width: 250px) 100vw, 250px"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrizeSection;
