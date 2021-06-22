import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const FormItemStyled = styled(Form.Item)`
  border: 1px solid #707070 !important;
  padding: 4px 16px !important;
  border-radius: 4px !important;

  label {
    color: #074494 !important;
    font-weight: bold !important;
  }

  transition: all 0.2s ease-in-out !important;

  .ant-input-affix-wrapper,
  .ant-input:focus,
  .ant-input:active,
  .ant-input:focus-visible,
  .ant-input:visited,
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused,
  .ant-input:focus-within {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .ant-form-item-children-icon {
    position: relative !important;
    top: -10px !important;
    font-size: 16px !important;
  }

  .ant-input-suffix {
    position: relative !important;
    top: -15px !important;
    font-size: 18px !important;
  }

  .ant-form-item-explain,
  .ant-form-item-extra,
  .ant-form-item-error {
    position: absolute;
    top: 45px;
    right: -16px;
  }

  .ant-form-item-extra {
    position: absolute;
    top: 68px;
    right: -16px;
  }
`;

const InputStyled = styled(Input.Password)`
  background-color: transparent !important;
  border-color: transparent !important;
  padding: 4px 0;
  :focus {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .ant-input {
    background-color: transparent !important;
  }

  .ant-input-prefix {
    color: #074494 !important;
    margin-right: 16px;
  }
`;

export default function PasswordInputCBP(props) {
  return (
    <FormItemStyled {...props} className="mt-5 mb-0" hasFeedback>
      <InputStyled size="large" {...props} />
    </FormItemStyled>
  );
}
