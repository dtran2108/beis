import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { DatePicker, Row, Col } from 'antd';

function RangePickerMobile(props) {
  const { placeholder, startValue, endValue, disabledStartDate, disabledEndDate, onStartChange, onEndChange, format } = props;
  return (
    <Row gutter={16}>
      <Col span={12}>
        <DatePicker
          disabledDate={disabledStartDate}
          format={format}
          value={startValue}
          placeholder={placeholder[0]}
          onChange={onStartChange}
        />
      </Col>
      <Col span={12}>
        <DatePicker disabledDate={disabledEndDate} format={format} value={endValue} placeholder={placeholder[1]} onChange={onEndChange} />
      </Col>
    </Row>
  );
}

RangePickerMobile.propType = {
  format: PropTypes.string,
  placeholder: PropTypes.array,
  onChange: PropTypes.func
};

RangePickerMobile.defaultProps = {
  format: 'DD/MM/YYYY',
  placeholder: ['Từ', 'Đến'],
  onChange: () => {}
};

export default compose(
  withState('startValue', 'setStartValue', null),
  withState('endValue', 'setEndValue', null),
  withHandlers({
    handleChangeDate: ({ startValue, endValue, onChange }) => () => {
      if (startValue && endValue) {
        onChange([startValue, endValue]);
      }
    }
  }),
  withHandlers({
    disabledStartDate: (props) => (startValue) => {
      const endValue = props.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate: (props) => (endValue) => {
      const startValue = props.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return endValue.valueOf() <= startValue.valueOf();
    },
    onStartChange: ({ setStartValue, handleChangeDate }) => (value) => {
      setStartValue(value, () => {
        handleChangeDate();
      });
    },
    onEndChange: ({ setEndValue, handleChangeDate }) => (value) => {
      setEndValue(value, () => {
        handleChangeDate();
      });
    }
  })
)(RangePickerMobile);
