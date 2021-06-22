import React from 'react';
import { FieldStyle } from './styles';

function FormField({ children, ...rest }) {
  return <FieldStyle {...rest}>{children}</FieldStyle>;
}

export default FormField;
