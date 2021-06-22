import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { FieldNumberStyle } from './styles';

export default class InputPriceField extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      label,
      name,
      disabled,
      value,
      help,
      size,
      onBlur,
      onChange,
      onInput,
      validateStatus,
      labelCol,
      wrapperCol,
      required = false,
      ...rest
    } = this.props;

    return (
      <FieldNumberStyle
        label={label}
        size={size}
        validateStatus={validateStatus}
        help={help}
        required={required}
        labelCol={labelCol}
        wrapperCol={wrapperCol}>
        <InputNumber
          formatter={(value) => {
            if (!value) return value;
            return `${value
              .toString()
              .split(/(?=(?:\d{3})+(?:\.|$))/g)
              .join(',')}đ`;
          }}
          // parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={0}
          name={name}
          onInput={onInput}
          disabled={disabled}
          {...rest}
        />
      </FieldNumberStyle>
    );
  }
}

InputPriceField.defaultProps = {
  hasIconLeft: false,
  hasIconRight: true,
  subFix: 'đ',
  hasCustom: true,
  disabled: false,
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  iconEnd: 'user',
  iconStart: 'user',
  type: 'text',
  autoComplete: 'false',
  addonAfter: []
};

InputPriceField.propTypes = {
  addonAfter: PropTypes.array,
  iconStart: PropTypes.string,
  subFix: PropTypes.string,
  iconEnd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.array,
  hasIconLeft: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string
};
