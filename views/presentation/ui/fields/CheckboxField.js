import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';
import { RadioBoxFieldStyle } from './styles';

const CheckboxGroup = Checkbox.Group;

const FormItem = Form.Item;

class CheckboxField extends PureComponent {
  render() {
    const { label, name, checked, disabled, help, onChange, onBlur, validateStatus } = this.props;
    return (
      <FormItem label={label} validateStatus={validateStatus} help={help}>
        <Checkbox name={name} checked={checked} disabled={disabled} onChange={onChange} onBlur={onBlur} style={{ fontSize: '16px' }}>
          {this.props.children}
        </Checkbox>
      </FormItem>
    );
  }
}

CheckboxField.defaultProps = {
  disabled: false
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export const CheckboxGroupField = (props) => {
  const { options, onChange, defaultValue, label, vertical, gutterbottom } = props;
  return (
    <RadioBoxFieldStyle label={label} vertical={vertical} gutterbottom={gutterbottom}>
      <CheckboxGroup name="social" options={options} onChange={onChange} value={defaultValue} />
    </RadioBoxFieldStyle>
  );
};

export default CheckboxField;
