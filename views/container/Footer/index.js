import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer id="footer" className="footer-wrapper">
        <section className="section footer" id="section_395790986">
          <div className="bg section-bg fill bg-fill bg-loaded" />
          <div className="section-content relative">
            <div className="row d-flex justify-content-between align-items-center" id="row-922902084">
              <div className="col small-12 large-3 d-lg-block d-none">
                <img src="/vninturist-assets/wp-content/uploads/assets/Logo-VNT-ngang-w-6.png" alt="logo chim" width="auto" height="auto" />
              </div>
              <div className="col small-12 large-6" style={{ paddingBottom: '0px' }}>
                <div className="col-inner text-center">
                  <div className="content-footer" style={{ textAlign: 'center', color: '#fff', fontFamily: 'Montserrat' }}>
                    <div className="logo-footer" style={{ width: '150px', marginBottom: '16px' }}>
                      <img
                        src="/vninturist-assets/wp-content/uploads/2020/12/Logo-VNT-ngang.png"
                        alt="logo ngang"
                        width="240px"
                        height="auto"
                      />
                    </div>
                    <h2 style={{ marginBottom: '16px', color: '#fff' }}>
                      <b>Công ty Cổ phần Vietnam Inturist</b>
                    </h2>
                    <p style={{ marginBottom: 0 }}>38-40 Thống Nhất, Nha Trang, Khánh Hòa</p>
                    <p style={{ marginBottom: 0 }}>Email: info@crystal.com</p>
                    <p style={{ marginBottom: '32px' }}>W: www.cbplus.vn</p>
                  </div>
                  <div className="social-icons follow-icons full-width text-center">
                    <Link href="#!" target="_blank" data-label="Facebook" rel="noopener noreferrer nofollow">
                      <img
                        style={{ marginRight: '16px', cursor: 'pointer' }}
                        src="/vninturist-assets/wp-content/uploads/assets/facebook.png"
                        alt="Facebook"
                        width="54px"
                        height="54px"
                      />
                    </Link>
                    <Link href="#!" target="_blank" rel="noopener noreferrer nofollow" data-label="Instagram" title="Follow on Instagram">
                      <img
                        style={{ marginRight: '16px', cursor: 'pointer' }}
                        src="/vninturist-assets/wp-content/uploads/assets/instagram.png"
                        alt="Instagram"
                        width="54px"
                        height="54px"
                      />
                    </Link>
                    <Link href="#!" target="_blank" rel="noopener noreferrer nofollow" data-label="YouTube" title="Follow on YouTube">
                      <img
                        src="/vninturist-assets/wp-content/uploads/assets/youtube.png"
                        alt="Youtube"
                        style={{ cursor: 'pointer' }}
                        width="54px"
                        height="54px"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col small-12 large-3 d-lg-block d-none">
                <img src="/vninturist-assets/wp-content/uploads/assets/cbptravel-1.png" alt="logo chim" width="240px" height="auto" />
              </div>
            </div>
          </div>
        </section>
        <div className="absolute-footer medium-text-center text-center">
          <div className="container clearfix">
            <div className="footer-primary pull-left">
              <div className="copyright-footer">© 2020 - 2022 Bản quyền thuộc về Công ty CP Kỳ nghỉ Crystal Bay Plus</div>
            </div>
          </div>
        </div>
        <Link href="#top">
          <span
            style={{ cursor: 'pointer' }}
            className="back-to-top button icon invert plain fixed bottom z-1 is-outline hide-for-medium circle"
            id="top-link">
            <i className="icon-angle-up" />
          </span>
        </Link>
      </footer>
    </>
  );
}
