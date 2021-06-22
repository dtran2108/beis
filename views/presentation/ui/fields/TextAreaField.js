import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { TextAreaFieldStyle } from './styles';
const { TextArea } = Input;

const TextAreaField = (props) => {
  const { rows, label, validateStatus, help, ...rest } = props;
  return (
    <TextAreaFieldStyle validateStatus={validateStatus} help={help} label={label}>
      <TextArea style={{ height: ' auto !important' }} rows={rows} {...rest} />
    </TextAreaFieldStyle>
  );
};

TextAreaField.defaultProps = {
  rows: 6
};

TextAreaField.propTypes = {
  rows: PropTypes.number
};

export default TextAreaField;
