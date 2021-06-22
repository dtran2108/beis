import React from 'react';
import moment from 'moment';
import { find } from 'lodash';
import { compose, withState, withHandlers, defaultProps } from 'recompose';
import MediaResponsive from 'react-responsive';
import { UIRangePicker } from '~/views/presentation/ui/rangePicker';
import { SelectField } from '../fields';

const items = [
  {
    key: 'all',
    label: 'Tất cả',
    startDate: '',
    endDate: ''
  },
  {
    key: 'today',
    label: 'Hôm nay',
    startDate: moment().startOf('d').utc().format(),
    endDate: moment().endOf('d').utc().format()
  },
  {
    key: 'lastDay',
    label: 'Hôm qua',
    startDate: moment().startOf('d').add(-1, 'd').utc().format(),
    endDate: moment().endOf('d').add(-1, 'd').utc().format()
  },
  {
    key: 'week',
    label: 'Tuần này',
    startDate: moment().startOf('w').utc().format(),
    endDate: moment().endOf('w').utc().format()
  },
  {
    key: 'lastWeek',
    label: 'Tuần trước',
    startDate: moment().startOf('w').add(-1, 'w').utc().format(),
    endDate: moment().endOf('w').add(-1, 'w').utc().format()
  },
  {
    key: 'month',
    label: 'Tháng này',
    startDate: moment().startOf('M').utc().format(),
    endDate: moment().endOf('M').utc().format()
  },
  {
    key: 'lastMonth',
    label: 'Tháng trước',
    startDate: moment().startOf('M').add(-1, 'M').utc().format(),
    endDate: moment().endOf('M').add(-1, 'M').utc().format()
  }
];
function DateRangeButtons(props) {
  const { activeKey, handleClick, handleChangeDate } = props;
  return (
    <ul className="nav nav-pills nav-pills-custom nav-filter-date w-100" id="pills-tab-custom" role="tablist">
      <MediaResponsive minDeviceWidth={576}>
        {items.map((item) => (
          <li className="nav-item" key={item.key}>
            <button
              className={`nav-link ${activeKey === item.key ? 'active show' : ''}`}
              onClick={() => {
                handleClick(item);
              }}>
              {item.label}
            </button>
          </li>
        ))}
      </MediaResponsive>
      <MediaResponsive maxDeviceWidth={576}>
        <li className="nav-item">
          <SelectField
            onChange={handleClick}
            defaultValue={activeKey}
            data={items.map((item) => ({ value: item.key, label: item.label }))}
            iconEnd="caret-down"
          />
        </li>
      </MediaResponsive>
      <li className="nav-item last">
        <UIRangePicker onChange={handleChangeDate} />
      </li>
    </ul>
  );
}

export default compose(
  withState('activeKey', 'setActiveKey', ({ defaultActiveKey }) => defaultActiveKey || 'all'),
  defaultProps({
    onClick: () => {}
  }),
  withHandlers({
    handleClick: (props) => (item) => {
      const { setActiveKey, onClick } = props;
      if (typeof item === 'string') {
        item = find(items, { key: item });
      } else {
        setActiveKey(item.key);
      }
      onClick({
        startDate: item.startDate,
        endDate: item.endDate,
        page: 1
      });
    },
    handleChangeDate: (props) => (dates) => {
      const { setActiveKey, onClick } = props;
      setActiveKey('');
      onClick({
        startDate: dates[0] ? dates[0].startOf('day').utc().format() : '',
        endDate: dates[1] ? dates[1].endOf('day').utc().format() : '',
        page: 1
      });
    }
  })
)(DateRangeButtons);
