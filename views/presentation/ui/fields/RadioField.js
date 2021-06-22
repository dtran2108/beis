import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RadioBoxFieldStyle } from './styles';

const RadioGroup = Radio.Group;

class RadioField extends PureComponent {
  render() {
    const { onChange, items, defaultValue, value, disabled, label, vertical, gutterbottom, spaceBetween, childWidth } = this.props;
    return (
      <RadioBoxFieldStyle
        label={label}
        // gutterbottom={gutterbottom}
        // vertical={vertical}
      >
        <RadioGroup onChange={onChange} value={value || value === 0 ? value : defaultValue} disabled={disabled}>
          {items.map((item) => (
            <div
              key={item.value}
              className={classnames(
                vertical && `mb-${gutterbottom} d-block`,
                spaceBetween && `justify-content-between`,
                item.child && 'd-flex align-items-center'
              )}
              style={{ paddingTop: '10px' }}>
              <Radio value={item.value}>{item.label}</Radio>
              <div style={{ width: childWidth ? `${childWidth}` : 'auto' }}>{item.child && item.child()}</div>
            </div>
          ))}
        </RadioGroup>
      </RadioBoxFieldStyle>
    );
  }
}

RadioField.defaultProps = {
  disabled: false,
  vertical: false,
  gutterbottom: '8px'
};

RadioField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gutterbottom: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;
