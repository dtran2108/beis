/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Empty, Button } from 'antd';

const WrapCEmpty = styled(Empty)`
  @media screen and (max-width: 576px) {
    overflow: scroll;
  }
`;

function CEmpty(props) {
  return (
    <WrapCEmpty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      // image={toAbsoluteUrl('/media/logos/logo-column.png')}
      imageStyle={{}}
      description={<span>{props.description}</span>}>
      <Button type="primary" onClick={props.onClick}>
        {'create_new'}
      </Button>
    </WrapCEmpty>
  );
}
CEmpty.defaultProps = {
  description: 'No data',
  onClick: () => {}
};
CEmpty.propTypes = {
  description: PropTypes.string,
  onClick: PropTypes.func
};

export default CEmpty;
