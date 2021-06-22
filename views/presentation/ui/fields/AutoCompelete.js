import React, { PureComponent } from 'react';
import { AutoComplete } from 'antd';
import PropTypes from 'prop-types';
import { FieldStyle } from './styles';

export default class InputField extends PureComponent {
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
      options,
      inline,
      required = false,
      ...rest
    } = this.props;

    return (
      <FieldStyle
        label={label}
        size={size}
        validateStatus={validateStatus}
        help={help}
        required={required}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        inline={inline}
        {...rest}>
        <AutoComplete
          dropdownMenuStyle={{ maxHeight: 1000, overflowY: 'visible' }}
          options={options}
          name={name}
          value={value === undefined ? '' : value}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          disabled={disabled}
          placeholder={placeholder}
          filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          style={inputStyle}
          {...rest}
        />
      </FieldStyle>
    );
  }
}

InputField.defaultProps = {
  // hasIconLeft: false,
  // hasIconRight: true,
  // hascustom: true,
  disabled: false,
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  iconEnd: 'user',
  iconStart: 'user',
  type: 'text',
  placeholder: '',
  autoComplete: 'false',
  inline: false,
  options: []
};

InputField.propTypes = {
  // hascustom: PropTypes.bool,
  iconStart: PropTypes.string,
  iconEnd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.array,
  options: PropTypes.array,
  // hasIconLeft: PropTypes.bool,
  // hasIconRight: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string
};
