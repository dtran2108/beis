import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputStyle = styled.input`
  width: 55px;
  height: 55px;
  text-align: center;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid #000;
  &:focus {
    border: 1px solid #7c4dff;
    outline: none;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 576px) {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

/**
 * This is react stateless component
 * Renders an input box
 * @param {Object} {
 *   focus,
 *   autoFocus,
 *   disabled,
 *   value,
 *   secure,
 *   ...rest
 * }
 * @returns
 */
const Input = ({ focus, autoFocus, disabled, value, onInputFocus, index, secure, inputStyles, otpType, ...rest }) => {
  const input = useRef(null);
  const componentMounted = useRef(false);
  useEffect(() => {
    // When component mounts
    if (autoFocus && focus) {
      input.current.focus();
    }
  }, [autoFocus, focus]);

  useEffect(() => {
    // When component focus updates
    if (componentMounted.current && focus) {
      input.current.focus();
    }
    componentMounted.current = true;
  }, [focus]);

  const handelInputFocus = (event) => onInputFocus(index, event);
  let inputType = 'text';
  if (secure) {
    inputType = 'password';
  } else if (otpType === 'number') {
    inputType = 'tel';
  }
  return (
    <InputStyle
      // style={{ ...inputDefaultStyles, ...inputStyles }}
      type={inputType}
      maxLength="1"
      ref={input}
      disabled={disabled}
      onFocus={handelInputFocus}
      value={value || ''}
      {...rest}
    />
  );
};

Input.propTypes = {
  focus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  numInputs: PropTypes.number,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  secure: PropTypes.bool,
  inputStyles: PropTypes.object,
  otpType: PropTypes.oneOf(['number', 'alpha', 'alphanumeric', 'any'])
};

export default React.memo(Input);
