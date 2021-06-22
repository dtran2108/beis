import React from 'react';
import { Select } from 'antd';
import { debounce, isObject } from 'lodash';
import { SelectStyle } from './styles';
import { compose, withState, withHandlers, pure, lifecycle } from 'recompose';
const Option = Select.Option;

const SuggestionField = (props) => {
  const { renderOpts, state, mode, label, help, size, validateStatus, gutterbottom, labelCol, wrapperCol, className } = props;
  const { key, text } = renderOpts;
  const options = state.data ? state.data.map((d) => <Option key={d[key]}>{d[text]}</Option>) : '';
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
      wrapperCol={wrapperCol}
      mode={mode}>
      <Select
        mode={mode}
        showSearch
        defaultValue={state.value}
        value={state.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        style={props.style}
        onSearch={debounce((value) => props.handleSearch(value), 300)}
        onChange={props.handleChange}
        loading={props.loading}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        allowClear
        notFoundContent={null}>
        {options}
      </Select>
    </SelectStyle>
  );
};

const initState = {
  data: [],
  value: undefined
};

SuggestionField.defaultProps = {
  loading: false
};

export default compose(
  pure,
  withState('state', 'setState', (props) => (props.defaultValue ? props.defaultValue : initState)),
  withHandlers({
    handleSearch: (props) => (value) => {
      props.handleFetch(value).then((res) => {
        props.setState((state) => ({ ...state, data: res[`${props.nameData}`] }));
      });
    },
    handleChange: (props) => (value) => {
      props.setState((state) => ({ ...state, value }));
      if (props.handleSelect) {
        props.handleSelect(value);
      }
    }
  }),
  lifecycle({
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data && (nextProps.data || []).length > 0) {
        nextProps.setState((state) => ({ ...state, data: nextProps.data || [] }));
      }
      if (this.props.value !== nextProps.value) {
        nextProps.setState((state) => ({ ...state, value: nextProps.value || [] }));
      }
    },
    componentDidUpdate(prevProps) {
      const { setState, defaultValue } = this.props;
      if (prevProps.defaultValue === undefined && isObject(defaultValue)) {
        setState(defaultValue);
      }
    },
    componentDidMount() {
      const { state, setState, data } = this.props;
      if ((data || []).length > 0) {
        setState({
          ...state,
          data: data
        });
      }
    }
  })
)(SuggestionField);
