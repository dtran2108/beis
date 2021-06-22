import React from 'react';
import styled from 'styled-components';

const ContentWrapperStyle = styled.div`
.image-gallery-image {
  max-width: 100%;
  max-height: 390px !important;
  height: 390px;
}
font-family: font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,  Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !important;
`;
/**
 *
 * @param {*} topNav {pageName : 'Test', links : [{ name : 'link', link : '#' }]}
 */
export const ContentWrapper = ({ children }) => {
  return <ContentWrapperStyle>{children}</ContentWrapperStyle>;
};

export default ContentWrapper;
