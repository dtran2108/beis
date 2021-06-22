import React, { PureComponent } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { FieldStyle } from './styles';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, WhatsAppOutlined, GoogleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Color } from '~/utils/layout';
// import Icon from '@ant-design/icons';
// import ViewIcon from '~/assets/icons/view.svg';
// import HideIcon from '~/assets/icons/group.svg';

export default class InputField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hiddenPassword: false
    };
  }
  render() {
    const {
      iconEnd,
      label,
      name,
      type,
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
      inline,
      required = false,
      ...rest
    } = this.props;

    const getIcon = (iconType) => {
      switch (iconType) {
        case 'password':
          return !this.state.hiddenPassword ? (
            <EyeOutlined
              onClick={() => {
                this.setState({ hiddenPassword: !this.state.hiddenPassword });
              }}
              color={Color.primary}
            />
          ) : (
            <EyeInvisibleOutlined
              onClick={() => {
                this.setState({ hiddenPassword: !this.state.hiddenPassword });
              }}
              color={Color.primary}
            />
          );
        case 'username':
          return <UserOutlined />;
        case 'phone':
          return <WhatsAppOutlined />;
        case 'email':
          return <GoogleOutlined />;
        case 'address':
          return <ThunderboltOutlined />;
      }
    };

    return (
      <FieldStyle
        label={label}
        size={size}
        validateStatus={validateStatus}
        help={help}
        required={required}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        inline={inline.toString()}>
        <Input
          name={name}
          value={value}
          type={type === 'password' && this.state.hiddenPassword ? '' : type}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          autoComplete={"false"}
          disabled={disabled}
          // prefix={getIcon(iconStart)}
          suffix={getIcon(iconEnd)}
          placeholder={placeholder}
          style={inputStyle}
          addonAfter={addonAfter}
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
  // iconStyle: { color: 'rgba(0,0,0,.25)' },
  iconEnd: 'user',
  // iconStart: 'user',
  type: 'text',
  placeholder: '',
  autoComplete: 'false',
  inline: false
};

InputField.propTypes = {
  // hascustom: PropTypes.bool,
  // iconStart: PropTypes.string,
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
