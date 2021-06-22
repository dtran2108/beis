import { Form } from 'antd';
import styled, { css } from 'styled-components';
import { Color } from '~/utils/layout';

const largeSize = css`
  height: 45px !important;
  padding-right: 13px !important;
`;
const defaultSize = css`
  height: 35px !important;
  font-size: 13px;
`;
const defaultNumberSize = css`
  height: 40px;
  font-size: 13px;
`;
export const FieldNumberStyle = styled(Form.Item)`
  width: 100%;
  display: block;

  margin-bottom: ${(props) => (props.mBottom ? props.mBottom : '10px')};

  .ant-input {
    ${(props) => (props.size === 'large' ? largeSize : defaultNumberSize)};
  }
  .ant-input-number-input {
    ${(props) => (props.size === 'large' ? largeSize : defaultNumberSize)};
  }
  .ant-calendar-picker {
    width: 100%;
  }
  .ant-input-number {
    height: 40px;
    width: 100% !important;
  }
`;
export const FieldStyle = styled(Form.Item)`
  .ant-select-dropdown.ant-select-dropdown-placement-bottomLeft div div:nth-child(2) div:nth-child(1) {
    height: inherit !important;
    position: relative;
    overflow: auto !important;
  }
  width: 100%;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.inline ? 'flex' : 'block')};
  margin-bottom: ${(props) => (props.mBottom ? props.mBottom : '10px')};

  .ant-input {
    ${(props) => (props.size === 'large' ? largeSize : defaultSize)};
  }
  .ant-input-number-input {
    ${(props) => (props.size === 'large' ? largeSize : defaultSize)};
  }
  .ant-calendar-picker {
    width: 100%;
  }
  .ant-input-number {
    width: 100% !important;
  }
  .ant-input-affix-wrapper {
    padding: 0px 11px;
  }
  .ant-form-item-control-input-content {
    min-height: 35px;
  }
  .ant-picker {
    width: 100%;
    height: 35px;
  }
`;
export const DynamicFieldsStyle = styled(Form.Item)`
  align-items: center;
  display: ${(props) => (props.inline ? 'flex' : 'block')};
  margin-bottom: ${(props) => (props.mBottom ? props.mBottom : '10px')};

  .ant-input {
    ${(props) => (props.size === 'large' ? largeSize : defaultSize)};
  }
  .ant-input-number-input {
    ${(props) => (props.size === 'large' ? largeSize : defaultSize)};
  }
  .ant-calendar-picker {
    width: 100%;
  }
  .ant-input-number {
    width: 100% !important;
  }
  .ant-form-item-control-input-content {
  }
`;
export const RadioBoxFieldStyle = styled(Form.Item)`
  margin-bottom: ${(props) => (props.mBottom ? props.mBottom : '24px')};
  .ant-radio-wrapper,
  .ant-checkbox-wrapper {
    ${(props) =>
      props.vertical &&
      css`
        display: block;
        margin-bottom: ${(props) => (props.gutterbottom ? props.gutterbottom : '8px')};
      `}
  }
`;

export const TextAreaFieldStyle = styled(Form.Item)`
  width: 100%;
  margin-bottom: ${(props) => (props.mBottom ? props.mBottom : '10px')};
  display: block;
`;

export const SelectStyle = styled(Form.Item)`
  ${(props) =>
    !props.gutterbottom &&
    css`
      margin-bottom: 0;
    `}

  .ant-select-selector {
    ${(props) => (props.size === 'large' ? largeSize : defaultSize)};
    ${(props) =>
      props.mode === 'multiple' &&
      css`
        height: auto;
      `}
    align-items: center;
  }

  .ant-input-search {
    border-radius: 4px;
    height: 35px;
  }

  .ant-select-selection__rendered .ant-select-search__field__placeholder {
    top: undefined !important;
  }

  span.ant-select-arrow {
    margin-top: -8px;
    font-size: 12px;
  }

  span.ant-select-selection-item {
    font-size: 15px;
  }
`;
export const ReStyle = styled.div`
  padding-bottom: 18px;
  select,
  input {
    width: 100%;
    border: 1px solid #ced4da;
    height: 42px;
    display: flex;
    padding: 0;
    padding-left: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.02), 0 1px 3px 0 rgba(50, 50, 93, 0.15);
    border-color: #fdfdfd;
  }
`;

export const PieButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #77909d;
  background: #fff;
  text-align: center;
  display: inline-block;
  line-height: 20px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  position: absolute;
  right: -8px;
  top: 10px;

  &:hover {
    color: red;
    border-color: red;
  }
`;

export const RemovePieButton = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  &:hover {
    color: red;
    border-color: red;
  }
`;

export const AddPieButton = styled.button`
  border-radius: 50%;
  border: 1px solid #77909d;
  margin: 0 5px 0 0px;
  color: #f6821f;
  &:hover {
    color: #f6821f;
    border-color: #f6821f;
  }
`;

export const EditorStyle = styled.div`
  padding: 10px 0;
  .quill {
    background: #fff;
    border-radius: 0.5em;
  }

  .ql-container {
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }

  .ql-editor {
    min-height: 18em;
  }

  .ql-bubble .ql-editor {
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }

  .ql-snow.ql-toolbar {
    display: block;
    background: #eaecec;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }
`;
