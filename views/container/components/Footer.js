import React from 'react';
import { Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__subscribe">
          <div className="footer__subscribe-title sub-header">Subscribe to BÉIS</div>
          <Input placeholder="Enter your email address" size="large" suffix={<ArrowRightOutlined />} />
        </div>
        <div className="subscribe-links-container">
          <div className="footer__nav-item">
            <a href="/pages/faq" className="footer__nav-link ">
              FAQ
            </a>
          </div>
          <div className="footer__nav-item">
            <a href="/pages/shipping" className="footer__nav-link ">
              SHIPPING
            </a>
          </div>
          <div className="footer__nav-item">
            <a href="/pages/returns-exchanges" className="footer__nav-link ">
              RETURNS &amp; EXCHANGES
            </a>
          </div>
        </div>
        <div className="footer__socials d-flex justify-content-center align-items-center">
          <a href="https://twitter.com/BeisTravel" className="footer__socials-item no-pjax" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 203.14" width={22}>
              <title>Twitter</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Logo_FIXED" data-name="Logo FIXED">
                  <path d="M78.62,203.14C173,203.14,224.56,125,224.56,57.2c0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,250,24a102.24,102.24,0,0,1-29.46,8.07A51.46,51.46,0,0,0,243.09,3.72a103,103,0,0,1-32.57,12.45A51.34,51.34,0,0,0,123.11,63,145.63,145.63,0,0,1,17.4,9.36,51.33,51.33,0,0,0,33.28,77.83,51,51,0,0,1,10,71.41v.65a51.32,51.32,0,0,0,41.15,50.28,51.2,51.2,0,0,1-23.16.88,51.36,51.36,0,0,0,47.92,35.62,103,103,0,0,1-63.7,22A106,106,0,0,1,0,180.1a145.22,145.22,0,0,0,78.62,23" />
                </g>
              </g>
            </svg>
          </a>
          <a href="https://www.facebook.com/Beis" className="footer__socials-item no-pjax" target="_blank" rel="noreferrer">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              style={{ enableBackground: 'new 0 0 24 24' }}
              xmlSpace="preserve"
              width={22}>
              <path d="M9,8H6v4h3v12h5V12h3.6L18,8h-4V6.3c0-1,0.2-1.3,1.1-1.3H18V0h-3.8C10.6,0,9,1.6,9,4.6V8z" />
            </svg>
          </a>
          <a href="http://instagram.com/beis" className="footer__socials-item no-pjax" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 503.84 503.84" width={20}>
              <title>Instagram</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Logo">
                  <path d="M251.92,45.39c67.27,0,75.23.26,101.8,1.47,24.56,1.12,37.9,5.22,46.78,8.67a78,78,0,0,1,29,18.85,78,78,0,0,1,18.85,29c3.45,8.88,7.55,22.22,8.67,46.78,1.21,26.57,1.47,34.53,1.47,101.8s-.26,75.23-1.47,101.8c-1.12,24.56-5.22,37.9-8.67,46.78a83.51,83.51,0,0,1-47.81,47.81c-8.88,3.45-22.22,7.55-46.78,8.67-26.56,1.21-34.53,1.47-101.8,1.47s-75.24-.26-101.8-1.47c-24.56-1.12-37.9-5.22-46.78-8.67a78,78,0,0,1-29-18.85,78,78,0,0,1-18.85-29c-3.45-8.88-7.55-22.22-8.67-46.78-1.21-26.57-1.47-34.53-1.47-101.8s.26-75.23,1.47-101.8c1.12-24.56,5.22-37.9,8.67-46.78a78,78,0,0,1,18.85-29,78,78,0,0,1,29-18.85c8.88-3.45,22.22-7.55,46.78-8.67,26.57-1.21,34.53-1.47,101.8-1.47m0-45.39c-68.42,0-77,.29-103.87,1.52S102.93,7,86.9,13.23A123.52,123.52,0,0,0,42.28,42.28a123.52,123.52,0,0,0-29,44.62C7,102.93,2.74,121.24,1.52,148.05S0,183.5,0,251.92s.29,77,1.52,103.87S7,400.91,13.23,416.94a123.52,123.52,0,0,0,29.05,44.62A123.68,123.68,0,0,0,86.9,490.62c16,6.22,34.34,10.48,61.15,11.71s35.45,1.51,103.87,1.51,77-.29,103.87-1.51,45.12-5.49,61.15-11.71a128.85,128.85,0,0,0,73.68-73.68c6.22-16,10.48-34.34,11.71-61.15s1.51-35.45,1.51-103.87-.29-77-1.51-103.87-5.49-45.12-11.71-61.15a123.68,123.68,0,0,0-29.06-44.62,123.52,123.52,0,0,0-44.62-29C400.91,7,382.6,2.74,355.79,1.52S320.34,0,251.92,0Z" />
                  <path d="M251.92,122.56A129.37,129.37,0,1,0,381.29,251.92,129.35,129.35,0,0,0,251.92,122.56Zm0,213.33a84,84,0,1,1,84-84A84,84,0,0,1,251.92,335.89Z" />
                  <circle cx="386.4" cy="117.44" r="30.23" />
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div className="footer__nav">
          <div className="container-fluid">
            <div className="d-md-flex justify-content-center flex-wrap">
              <div className="footer__nav-item">
                <a href="/products/giftcard" className="footer__nav-link ">
                  E-Gift Cards
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="/pages/contact-us" className="footer__nav-link ">
                  Contact Us
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="/pages/terms-conditions" className="footer__nav-link ">
                  Terms &amp; Conditions
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="/pages/privacy-policy" className="footer__nav-link ">
                  Privacy Policy
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="https://beistravel.com/pages/cookies" className="footer__nav-link ">
                  Cookies
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="/pages/stores" className="footer__nav-link ">
                  Store Locator
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="/blogs/news" className="footer__nav-link ">
                  Blog
                </a>
              </div>
              <div className="footer__nav-item">
                <a href="/pages/about" className="footer__nav-link ">
                  About
                </a>
              </div>
              {/* Termly Footer Buttons */}
              <div className="footer__nav-item termly-btn-link" style={{ display: 'none' }}>
                {/* <a href="#" className="footer__nav-link termly-cookie-preference-button " onclick="displayPreferenceModal()">
                  Manage Cookie Preferences
                </a> */}
              </div>
              <div className="footer__nav-item termly-btn-link" style={{ display: 'none' }}>
                <a href="/pages/delete-me" className="footer__nav-link delete-me-link ">
                  Delete My Info
                </a>
              </div>
              {/* End Termly Footer Buttons */}
              <div className="footer__nav-item">
                <span className="footer__nav-link">© BEIS, LLC 2021</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
