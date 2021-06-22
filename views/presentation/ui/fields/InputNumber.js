import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { FieldNumberStyle } from './styles';

export default class InputPrice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hiddenPassword: false
    };
  }
  render() {
    const {
      label,
      name,
      disabled,
      value,
      help,
      size,
      placeholder,
      onBlur,
      onChange,
      onInput,
      validateStatus,
      inputStyle,
      labelCol,
      wrapperCol,
      addonAfter,
      prefix,
      suffix,
      min,
      className,
      defaultValue,
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
        wrapperCol={wrapperCol}
        className={className}>
        <InputNumber
          name={name}
          defaultValue={defaultValue || 0}
          value={value}
          formatter={(value) => `${prefix || ''}${value}${suffix || ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          size={size}
          parser={(value) => value.replace(/\D\s?|(,*)/g, '')}
          onChange={onChange}
          onBlur={onBlur}
          min={min || 0}
          onInput={onInput}
          disabled={disabled}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder}
          style={inputStyle}
          addonAfter={addonAfter}
          {...rest}
        />
      </FieldNumberStyle>
    );
  }
}

InputPrice.defaultProps = {
  // hasIconLeft: false,
  // hasIconRight: true,
  // hascustom: true,
  disabled: false,
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  iconEnd: 'user',
  iconStart: 'user',
  type: 'text',
  placeholder: '',
  autoComplete: 'false'
};

InputPrice.propTypes = {
  // hascustom: PropTypes.bool,
  iconStart: PropTypes.string,
  iconEnd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.array,
  // hasIconLeft: PropTypes.bool,
  // hasIconRight: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string
};
