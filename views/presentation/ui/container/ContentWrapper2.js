import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

function ContentWrapper2(props) {
  const { children, title, tools, mb } = props;
  const CardBody = styled.div`
    &.card-body {
      padding: 1.25rem;
    }
    @media (max-width: 575px) {
      &.card-body {
        padding: 0rem 0rem;
      }
    }
  `;
  return (
    <div className={classNames('card', 'mb-' + mb)} style={{ borderRadius: '4px' }}>
      <CardBody className="card-body">
        {(title || tools) && (
          <div>
            {title && <span>{title}</span>}
            {tools && <span className="card-tools-2">{tools}</span>}
          </div>
        )}
        {children}
      </CardBody>
    </div>
  );
}

ContentWrapper2.propTypes = {
  title: PropTypes.string,
  tools: PropTypes.any,
  mb: PropTypes.number
};

export default ContentWrapper2;
