import React from 'react';
import PropTypes from 'prop-types';
import MediaResponsive from 'react-responsive';
import { DatePicker } from 'antd';
import RangePickerMobile from './RangePickerMobile';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const WrapperRangePickder = styled(MediaResponsive)`
  .ant-picker-range {
    border-radius: 4px;
    min-height: 35px;
  }
`;
function UIRangePicker(props) {
  const { onChange, ...rest } = props;
  return (
    <React.Fragment>
      {/* desktop only */}
      <WrapperRangePickder minDeviceWidth={576}>
        <RangePicker onChange={onChange} {...rest} />
      </WrapperRangePickder>
      <MediaResponsive maxDeviceWidth={576}>
        {/* mobile version */}
        <RangePickerMobile onChange={onChange} {...rest} />
      </MediaResponsive>
    </React.Fragment>
  );
}

UIRangePicker.propType = {
  format: PropTypes.string,
  placeholder: PropTypes.array,
  onChange: PropTypes.func
};

UIRangePicker.defaultProps = {
  format: 'DD/MM/YYYY',
  placeholder: ['Từ', 'Đến'],
  onChange: () => {}
};

export default UIRangePicker;
