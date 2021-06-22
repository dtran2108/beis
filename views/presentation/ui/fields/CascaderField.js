import React, { PureComponent } from 'react';
import { Cascader } from 'antd';
import PropTypes from 'prop-types';
import { FieldStyle } from './styles';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  iconEnd: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  inputStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  onChange: PropTypes.func
};

const defaultProps = {
  iconEnd: 'caret-down',
  placeholder: '',
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  options: [],
  value: [],
  onChange: () => {}
};

class CascaderField extends PureComponent {
  displayRender(label) {
    return label[label.length - 1];
  }
  render() {
    const { label, name, size, placeholder, inputStyle, options, value, onChange } = this.props;
    return (
      <FieldStyle label={label} size={size}>
        <Cascader
          name={name}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          value={value}
          displayRender={this.displayRender}
          style={inputStyle}
          // suffixIcon={iconEnd && <Icon type={iconEnd} style={iconStyle} />}
          changeOnSelect
        />
      </FieldStyle>
    );
  }
}

CascaderField.defaultProps = defaultProps;

CascaderField.propTypes = propTypes;

export default CascaderField;
