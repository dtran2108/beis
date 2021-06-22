import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SegmentedControl } from 'segmented-control-react';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getArray, isNullOrEmpty, getString } from '~/utils/helpers/utilObject';
import UtilDate from '~/views/utils/helpers/UtilDate';
import _ from 'lodash';

const { RangePicker } = DatePicker;

const SegmentedControlStyle = styled.div`
  .r-segmented-control ul li span {
    padding: 10px 10px 10px 10px;
  }
  .r-segmented-control {
    background-color: transparent;
    border-bottom: none;
    border-left: none;
  }
  .r-segmented-control ul li.base.selected {
    background-color: #478a25 !important;
    color: #fff;
  }
  .r-segmented-control ul {
    padding-left: 0px;
    padding-right: 0px;
  }
  .r-segmented-control ul li.base {
    border-color: #478a25 !important;
    color: #478a25 !important;
  }
  .r-segmented-control ul li {
    height: 30px;
  }
`;

let dateType = {
  today: 'today',
  week: 'week',
  month: 'month',
  year: 'year',
  custom: 'custom'
};

let rangeDateTypes = [
  { name: <FormattedMessage id="ORDER_LIST_VIEW_TODAY" defaultMessage="Hôm nay" />, type: dateType.today },
  { name: <FormattedMessage id="ORDER_LIST_VIEW_WEEK" defaultMessage="Tuần" />, type: dateType.week },
  { name: <FormattedMessage id="ORDER_LIST_VIEW_MONTH" defaultMessage="Tháng" />, type: dateType.month },
  { name: <FormattedMessage id="ORDER_LIST_VIEW_YEAR" defaultMessage="Năm" />, type: dateType.year },
  { name: <FormattedMessage id="ORDER_LIST_VIEW_CHOOSE" defaultMessage="Chọn ngày" />, type: dateType.custom }
];

const initSegment = (types = ['today', 'week', 'month', 'custom']) => {
  let result = rangeDateTypes.filter((item) => _.includes(types, item.type));
  return result;
};

class ChooseDate extends React.Component {
  constructor(props) {
    super(props);
    const { defaultType, rangeType = ['today', 'week', 'month', 'custom'] } = this.props;
    this.state = {
      segments: initSegment(rangeType),
      selected: defaultType,
      prvSelected: defaultType
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.selected !== nextProps.defaultType) {
      this.setState(
        {
          selected: nextProps.defaultType,
          prvSelected: nextProps.defaultType
        },
        () => {
          let selectedIndex = _.findIndex(this.state.segments, { type: nextProps.defaultType });
          this.segmentedControl && this.segmentedControl.setState({ selectedSegment: selectedIndex });
        }
      );
    }
  }
  onChangeDateRange = (startDate, endDate, type) => {
    const { onChangeValues } = this.props;
    onChangeValues &&
      onChangeValues({
        from: startDate,
        to: endDate,
        type: type
      });
  };
  handleChange = (index) => {
    let selectedObject = this.state.segments.find((_, idx) => idx === index);
    this.setState({ selected: getString(selectedObject, 'type'), prvSelected: this.state.selected }, () => this.handleSelectedRange());
  };
  handleSelectedRange = () => {
    const { selected } = this.state;
    if (selected === dateType.today) {
      let rangeDate = UtilDate.getRangeDate('today');
      let strStart = UtilDate.toDateTimeUtc(rangeDate.from);
      let strEnd = UtilDate.toDateTimeUtc(rangeDate.to);

      this.onChangeDateRange(strStart, strEnd, this.state.selected);
    } else if (selected === dateType.week) {
      let rangeDate = UtilDate.getRangeDate('week');
      let strStart = UtilDate.toDateTimeUtc(rangeDate.from);
      let strEnd = UtilDate.toDateTimeUtc(rangeDate.to);

      this.onChangeDateRange(strStart, strEnd, this.state.selected);
    } else if (selected === dateType.month) {
      let rangeDate = UtilDate.getRangeDate('month');
      let strStart = UtilDate.toDateTimeUtc(rangeDate.from);
      let strEnd = UtilDate.toDateTimeUtc(rangeDate.to);

      this.onChangeDateRange(strStart, strEnd, this.state.selected);
    } else if (selected === dateType.year) {
      let rangeDate = UtilDate.getRangeDate('year');
      let strStart = UtilDate.toDateTimeUtc(rangeDate.from);
      let strEnd = UtilDate.toDateTimeUtc(rangeDate.to);

      this.onChangeDateRange(strStart, strEnd, this.state.selected);
    }
  };
  render() {
    let segmentTitle = this.state.segments.map((item) => ({ name: item.name }));
    let selectedIndex = _.findIndex(this.state.segments, { type: this.state.selected });
    // if( this.state.selected !== dateType.custom && selectedIndex === -1) return null
    if (selectedIndex === -1) {
      selectedIndex = this.state.segments.length;
    }

    return this.state.selected !== dateType.custom ? (
      <SegmentedControlStyle>
        <SegmentedControl
          segments={segmentTitle}
          selected={selectedIndex}
          ref={(c) => (this.segmentedControl = c)}
          variant="base"
          onChangeSegment={this.handleChange}
        />
      </SegmentedControlStyle>
    ) : (
      <RangePicker
        className="mt-2 mb-0"
        defaultValue={
          this.props.defaultFrom && this.props.defaultTo
            ? [
                moment.utc(this.props.defaultFrom, UtilDate.formatDateTimeServer).local(),
                moment.utc(this.props.defaultTo, UtilDate.formatDateTimeServer).local()
              ]
            : undefined
        }
        format={UtilDate.formatDateLocal}
        onChange={(dates, dateStrings) => {
          let notEmptyDateStrings = (getArray(dateStrings) || []).filter((item) => !isNullOrEmpty(item));
          if (notEmptyDateStrings.length === 0) {
            this.onChangeDateRange('', '', '');
          } else {
            this.onChangeDateRange(UtilDate.toDateTimeUtc(dates[0]), UtilDate.toDateTimeUtc(dates[1]), dateType.custom);
          }
        }}
      />
    );
  }
}

export default ChooseDate;
