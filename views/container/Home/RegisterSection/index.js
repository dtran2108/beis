import React from 'react';
import RegisterForm from './RegisterForm';
import { AOS_DATA } from '~/configs/index';

export default function RegisterSection() {
  return (
    <>
      <section className="section" id="section_792779038">
        <div className="bg section-bg fill bg-fill" />
        <div style={{ background: 'rgba(0,0,0,0.52)', position: 'absolute', top: 0, width: '100%', height: '100%' }} />
        <div className="section-content relative">
          <div className="row" id="row-310313210">
            <div className="col medium-6 small-12 large-6">
              <div className="col-inner">
                <div role="form" className="wpcf7" id="wpcf7-f287-p2-o1" lang="vi" dir="ltr" data-aos={AOS_DATA.zoomInRight}>
                  <div className="screen-reader-response">
                    <p role="status" aria-live="polite" aria-atomic="true" />
                    <ul />
                  </div>
                  <RegisterForm />
                </div>
              </div>
            </div>
            <div className="col medium-6 small-12 large-6">
              <div className="col-inner">
                <div className="content-des-register" data-aos={AOS_DATA.fadeLeft}>
                  <span>
                    <h1 style={{ color: '#fff' }}>
                      <b>
                        Trở thành chủ sỡ hữu Thẻ đồng
                        <br /> thương hiệu CBP x BIDV ngay hôm nay!
                      </b>
                    </h1>
                  </span>
                  <hr className="style-hr-register" />
                  <p>
                    Lorem ipsum dolor sit a – do eiusmod tempor incididunt
                    <br />
                    ut labore et dolore magna aliqua. Nisl tincidunt eget
                    <br />
                    nullam non.
                  </p>
                  <p>
                    Quis hendrerit dolor magna eget est lorem ipsum dolor
                    <br />
                    sit. Volutpat odio facilisis mauris sit amet massa.Lorem
                    <br />
                    ipsum dolor sit a – do eiusmod tempor
                  </p>
                  <p>
                    Commodo odio aenean sed adipiscing diam donec
                    <br />
                    adipiscing tristique. Mi eget mauris pharetra et.Lorem
                    <br />
                    ipsum dolor sit a
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
