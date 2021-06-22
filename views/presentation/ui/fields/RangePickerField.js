import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FieldStyle } from './styles';
import { UIRangePicker } from '../rangePicker';

const WrapperField = styled.span`
  display: block;
`;

// const { RangePicker } = DatePicker;

class RangePickerField extends PureComponent {
  render() {
    const { label, disabled, help, size, placeholder, onChange, validateStatus, formatInput, styleInput, ...rest } = this.props;
    return (
      <WrapperField className="range-picker-field">
        <FieldStyle label={label} size={size} validateStatus={validateStatus} help={help}>
          <UIRangePicker
            style={styleInput}
            format={formatInput}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
          />
        </FieldStyle>
      </WrapperField>
    );
  }
}

export default RangePickerField;

RangePickerField.defaultProps = {
  disabled: false,
  hasIconRight: true,
  hasCustom: true,
  placeholder: ['Từ', 'Đến'],
  formatInput: 'DD/MM/YYYY',
  iconStyle: { color: 'rgba(0,0,0,.25)' }
};

RangePickerField.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  formatInput: PropTypes.string,
  styleInput: PropTypes.object
};
