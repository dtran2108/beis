import React, { PureComponent } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { SelectStyle } from './styles';
import { getArray, getString } from '~/utils/helpers/utilObject';
// import polygon from '~/assets/icons/polygon.svg';
const Option = Select.Option;

export default class SelectField extends PureComponent {
  render() {
    const {
      label,
      help,
      data,
      size,
      onChange,
      className,
      disabled,
      onBlur,
      validateStatus,
      inputStyle,
      placeholder,
      labelCol,
      wrapperCol,
      mode,
      value,
      showSearch,
      loading,
      required = false,
      defaultValue,
      ...rest
    } = this.props;
    return (
      <SelectStyle
        label={label}
        size={size}
        required={required}
        className={className}
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        // gutterbottom={gutterbottom}
        labelCol={labelCol}
        wrapperCol={wrapperCol}>
        <Select
          defaultValue={defaultValue}
          loading={loading}
          showSearch={showSearch}
          style={inputStyle}
          onChange={onChange}
          onBlur={onBlur}
          allowClear
          disabled={disabled}
          placeholder={placeholder}
          mode={mode}
          value={getArray(data, undefined, []).length > 0 ? value : undefined}
          // suffixIcon={polygon}
          dropdownStyle={{ fontSize: '15px' }}
          filterOption={(input, option) =>
            (getString(option, 'props.children') && getString(option, 'props.children', '').toLowerCase().includes(input.toLowerCase())) ||
            (option.props.value !== null && option.props.value.toString().toLowerCase().includes(input.toLowerCase()))
          }
          {...rest}>
          {data &&
            data.map((item) => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
        </Select>
      </SelectStyle>
    );
  }
}

SelectField.defaultProps = {
  disabled: false,
  placeholder: '',
  defaultValue: undefined,
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  gutterbottom: 'true',
  mode: 'default',
  showSearch: false,
  loading: false
};

SelectField.propTypes = {
  showSearch: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  data: PropTypes.array,
  gutterbottom: PropTypes.string
};
