import React, { PureComponent } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { SelectStyle } from './styles';

export default class SearchField extends PureComponent {
  constructor(props) {
    super(props);
    const { initialValue } = props;
    this.state = {
      value: initialValue
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.initialValue) {
      this.setState({ value: nextProps.initialValue });
    }
  }

  render() {
    const {
      label,
      help,
      size,
      onChange,
      onChangeText,
      onSearchValue,
      className,
      validateStatus,
      gutterbottom,
      labelCol,
      wrapperCol,
      mode,
      enterButton,
      defaultValue
    } = this.props;

    let { placeholder } = this.props;
    const { Search } = Input;

    if (typeof placeholder === 'undefined') placeholder = 'input search text';
    return (
      <SelectStyle
        label={label}
        size={size}
        className={className}
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        gutterbottom={gutterbottom}
        labelCol={labelCol}
        defaultValue={defaultValue}
        wrapperCol={wrapperCol}
        mode={mode}>
        <Search
          size={size}
          placeholder={placeholder}
          enterButton={enterButton}
          value={this.state.value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
            onChange && onChange(e);
            onChangeText && onChangeText(e.target.value);
          }}
          style={{ width: '100%' }}
          onSearch={() => {
            onSearchValue && onSearchValue(this.state.value || '');
          }}
        />
      </SelectStyle>
    );
  }
}

SearchField.defaultProps = {
  disabled: false,
  placeholder: '',
  defaultValue: '',
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  gutterbottom: 'true',
  mode: 'default'
};

SearchField.propTypes = {
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
