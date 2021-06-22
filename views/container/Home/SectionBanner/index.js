import React from 'react';
import Link from 'next/link';
import { AOS_DATA } from '~/configs/index';

export default function SectionBanner() {
  return (
    <>
      <section className="section banner-home" id="section_1190125949" data-aos={AOS_DATA.zoomOutRight}>
        <div className="bg section-bg fill bg-fill" />
        <div className="section-content relative">
          <div className="row" id="row-218189282">
            <div className="col medium-5 small-12 large-5">
              <div className="col-inner"></div>
            </div>
            <div className="col medium-7 small-12 large-7" style={{ paddingTop: '142px' }}>
              <div className="col-inner">
                <div data-aos={AOS_DATA.fadeRight} className="text-banner" style={{ fontFamily: '"Montserrat"', color: '#ffffff' }}>
                  <p style={{ fontSize: '32px', marginBottom: '8px', fontWeight: 500 }}>ĐẦU TƯ SINH LỢI</p>
                  <p style={{ fontSize: '48px', marginBottom: '24px', fontWeight: 600 }}>HƯỞNG THỤ TRỌN ĐỜI</p>
                  <p style={{ marginBottom: '48px' }}>
                    <b>Thẻ Đầu tư - Kỳ nghỉ CBP Riviera</b> với thời gian sở hữu không giới hạn đầu tiên tại Việt Nam. Với lãi suất{' '}
                    <b>~10%/năm</b>
                    nghĩ dưỡng tại Resort chuẩn <b>5 sao</b>. Nếu không đặt được phòng? Bạn sẽ được <b>bồi hoàn</b> lên đến{' '}
                    <b>110% giá trị</b> Thẻ dưới sự bảo lãnh của <b>Ngân hàng BIDV</b>. Và còn nhiều hơn thế nữa…
                  </p>
                </div>
                <div data-aos={AOS_DATA.zoomOut}>
                  <Link href="#!">
                    <span className="button is-large btn-banner" style={{ borderRadius: '99px' }}>
                      Tìm hiểu ngay
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
