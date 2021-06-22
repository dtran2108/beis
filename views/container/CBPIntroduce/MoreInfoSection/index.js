import React from 'react';
import { UIPrimaryButton } from '~/views/presentation/ui/buttons';
import { AOS_DATA } from '~/configs/index';

const PrizeSection = (props) => {
  return (
    <section className="section" id="section_1534148446" {...props}>
      <div
        data-aos={AOS_DATA.zoomOutLeft}
        style={{
          backgroundImage: 'url("/vninturist-assets/wp-content/uploads/2020/12/bg1.jpg")',
          height: '500px',
          width: '100vw',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}>
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: '500px', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'relative', top: 0 }}>
          <div className="row" data-aos={AOS_DATA.fadeRight}>
            <div className="col-12 col-md-6 col-lg-6 text-center d-flex flex-column justify-content-center align-items-center">
              <h1 style={{ color: 'white', fontSize: '35px' }}>
                <b>CBP RIVIERA</b>
              </h1>
              <h5 className="mb-4" style={{ color: 'white', fontSize: '16px' }}>
                CẢM NHẬN TRỌN VẸN GIÁ TRỊ SỐNG ĐẲNG CẤP
              </h5>
              <UIPrimaryButton className="m-0" style={{ width: '55%', fontSize: '22px', fontWeight: 'bold' }} title="TÌM HIỂU NGAY" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;
