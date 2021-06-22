import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

const SpanStyled = styled.span`
  color: #fff;
  padding-bottom: 5px;
  border-bottom: ${(props) => (props.active ? '3px solid #006eff !important' : '3px solid transparent')};
  transition: border-bottom 0.3s ease-in-out;
`;

export default function SupportElement(props) {
  const [location, setLocation] = useState();
  useEffect(() => {
    setLocation(window.location.pathname === '/en' ? 'home' : window.location.pathname);
  }, []);

  const checkActive = (currentLocation, url) => {
    if (currentLocation?.split('/').includes(url.split('/')[url.split('/').length - 1])) {
      return true;
    }
    return false;
  };

  return (
    <Link href={props.url}>
      <div className="col medium-3 small-6 large-3 py-0">
        <div className="col-inner">
          <div className="icon-box featured-box icon-booking icon-box-center text-center">
            <div className="icon-box-text last-reset" style={{ cursor: 'pointer' }}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <SVG src={props.icon} className="mb-2"></SVG>
                <SpanStyled active={checkActive(location, props.url)}>{props.title}</SpanStyled>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
