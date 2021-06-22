import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import { getArray } from '~/utils/helpers/utilObject';
import styled from 'styled-components';
import { Form } from 'antd';
import UtilDate from '~/views/utils/helpers/UtilDate';

import strings from '~/localization';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

/**viet
 *
 */
const FieldStyle = styled(Form.Item)`
  .ant-popover-inner-content {
    padding: 0px !important;
  }
  label {
    color: black !important;
    font-size: 16px;
  }
  .ant-select-dropdown.ant-select-dropdown-placement-bottomLeft div div:nth-child(2) div:nth-child(1) {
    height: inherit !important;
    position: relative;
    overflow: auto !important;
  }
  width: 100%;
  display: block;
  button {
    width: 400px;
    display: flex;
    height: fit-content;
    flex-direction: column;
  }
  .icon-expand {
    position: absolute !important;
    left: 91%;
    top: 10px;
  }
`;
const WrapContent = styled.div`
  min-width: 260px;
  width: 320px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-right: none;
  border-bottom: none;
  .border-title {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    font-size: 15px;
    font-weight: 100;
    text-transform: uppercase;
    text-align: center;
    color: #757575;
    width: 100%;
    margin: 0;
    padding: 1em;
    background-color: #fff;
    font-weight: 600;
  }

  .button-custom {
    height: 47px;
    border: none;
    width: 50%;
    border-radius: 0;
    span {
      font-weight: 600;
    }
    border-right: 1px solid rgb(204, 204, 204) !important;
  }
  .ant-btn:focus {
    border: none;
  }
  .active-button {
    border-bottom: 3px solid #5d9c14 !important;
  }
  .item {
    background-color: #f0f0f0;
    padding: 12px 12px 12px 36px;
    position: relative;
    display: block;
    width: 50%;
    display: inline-block;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .item:hover {
    background-color: #ddd;
  }
  .square {
    margin: 0px 14px;
    width: 8px;
    height: 8px;
    display: inline-block;
    background-color: #5d9c14;
  }
  .active-choose {
    background-color: #fff;
    font-weight: 600;
    padding: 12px 12px 12px 0px !important;
  }
  .active-choose:hover {
    background-color: #fff;
  }
  .compare {
    height: 42px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    color: #757575;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }
`;
const dataSrc = [
  {
    id: 'today',
    name: strings.today
  },
  {
    id: 'yesterday',
    name: strings.yesterday
  },
  {
    id: 'weekToDate',
    name: strings.week_to_date
  },
  {
    id: 'lastWeek',
    name: strings.last_week
  },
  {
    id: 'monthToDate',
    name: strings.month_to_date
  },
  {
    id: 'lastMonth',
    name: strings.last_moth
  },
  {
    id: 'quarterToDate',
    name: strings.quarter_to_date
  },
  {
    id: 'lastQuarter',
    name: strings.last_quarter
  },
  {
    id: 'yearToDate',
    name: strings.year_to_date
  },
  {
    id: 'lastYear',
    name: strings.last_year
  }
];
const BORDER = '1px solid #ccc';
const Content = (props) => {
  /** activeButton @param  === 1 cai dat truoc
   *               @param === 2 tuy trinh
   */
  const [activeButton, setActiveButton] = useState(1);
  /**default value mode */
  const [activeChoose, setActiveChoose] = useState('today');
  const [activeChooseCompare, setActiveChooseCompare] = useState('periodPrevious');
  /**date picker */
  const [firstDatePicker, setFirstDatePicker] = useState(undefined);
  const [secondDatePicker, setSecondDatePicker] = useState(undefined);

  const _handleChooseCompare = (item) => {
    setActiveChooseCompare(item);
  };
  const _handleChoose = (item) => {
    setActiveChoose(item.id);
  };
  let dateFist = moment.utc(firstDatePicker, UtilDate.formatDateTimeServer).local();
  let dateSecond = moment.utc(secondDatePicker, UtilDate.formatDateTimeServer).local();
  let date = [dateFist.isValid() ? dateFist : undefined, dateSecond.isValid() ? dateSecond : undefined];
  /**funtion get Ranger !!!
   *
   */
  const getRanger = () => {
    let fist = moment().startOf('isoweek').endOf('day');
    let second = moment().endOf('day');
    let ranger = second.diff(fist, 'days');
    if (activeChooseCompare === 'periodPrevious') {
      switch (activeChoose) {
        case 'today':
          return {
            fistValue: {
              fist: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            },
            secondValue: {
              fist: moment().subtract(1, 'day').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            }
          };
        case 'yesterday':
          return {
            fistValue: {
              fist: moment().subtract(1, 'day').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            },
            secondValue: {
              fist: moment().subtract(2, 'day').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            }
          };
        case 'weekToDate':
          fist = moment().startOf('isoweek').endOf('day');
          second = moment().endOf('day');
          ranger = second.diff(fist, 'days');
          return {
            fistValue: {
              fist: moment().startOf('isoweek').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .subtract(1, 'weeks')
                .startOf('week')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'weeks')
                .startOf('week')
                .add(ranger, 'days')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'lastWeek':
          return {
            fistValue: {
              fist: moment()
                .subtract(1, 'weeks')
                .startOf('week')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'weeks')
                .endOf('isoWeek')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .subtract(2, 'weeks')
                .startOf('week')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(2, 'weeks')
                .endOf('isoWeek')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'lastMonth':
          return {
            fistValue: {
              fist: moment()
                .subtract(1, 'months')
                .startOf('month')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'months')
                .endOf('month')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .subtract(2, 'months')
                .startOf('month')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(2, 'months')
                .endOf('month')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'monthToDate': {
          fist = moment().startOf('month');
          second = moment().endOf('day');
          ranger = second.diff(fist, 'days');
          return {
            fistValue: {
              fist: moment().startOf('month').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .subtract(1, 'months')
                .startOf('month')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'months')
                .startOf('month')
                .add(ranger, 'days')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        }
        case 'lastQuarter':
          return {
            fistValue: {
              fist: moment()
                .startOf('quarter')
                .subtract(1, 'quarter')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'quarter')
                .endOf('quarter')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .startOf('quarter')
                .subtract(2, 'quarter')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(2, 'quarter')
                .endOf('quarter')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'quarterToDate': {
          fist = moment().startOf('quarter');
          second = moment().endOf('day');
          ranger = second.diff(fist, 'days');
          return {
            fistValue: {
              fist: moment().startOf('quarter').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .startOf('quarter')
                .subtract(1, 'quarter')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'quarter')
                .startOf('quarter')
                .add(ranger, 'days')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        }
        case 'lastYear':
          return {
            fistValue: {
              fist: moment()
                .startOf('year')
                .subtract(1, 'year')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'year')
                .endOf('year')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .startOf('year')
                .subtract(2, 'year')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(2, 'year')
                .endOf('year')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'yearToDate': {
          fist = moment().startOf('year');
          second = moment().endOf('day');
          ranger = second.diff(fist, 'days');
          return {
            fistValue: {
              fist: moment().startOf('year').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment().startOf('year').utc().format(UtilDate.formatDateTimeServer),
              second: moment().startOf('year').add(ranger, 'days').utc().format(UtilDate.formatDateTimeServer)
            }
          };
        }
        default:
          break;
      }
    } else if (activeChooseCompare === 'yearPrevious') {
      switch (activeChoose) {
        case 'today':
          return {
            fistValue: {
              fist: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            },
            secondValue: {
              fist: moment().subtract(1, 'year').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            }
          };
        case 'yesterday':
          return {
            fistValue: {
              fist: moment().subtract(1, 'day').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            },
            secondValue: {
              fist: moment().subtract(1, 'year').subtract(1, 'day').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: null
            }
          };
        case 'weekToDate':
          return {
            fistValue: {
              fist: moment().startOf('isoweek').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment().startOf('isoweek').subtract(1, 'year').endOf('day').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer)
            }
          };
        case 'lastWeek':
          return {
            fistValue: {
              fist: moment().subtract(1, 'weeks').startOf('week').utc().format(UtilDate.formatDateTimeServer),
              second: moment().subtract(1, 'weeks').endOf('Week').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment().subtract(1, 'weeks').startOf('week').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer),
              second: moment().subtract(1, 'weeks').endOf('Week').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer)
            }
          };
        case 'lastMonth':
          return {
            fistValue: {
              fist: moment()
                .subtract(1, 'months')
                .startOf('month')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'months')
                .endOf('month')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .subtract(1, 'months')
                .startOf('month')
                .subtract(1, 'year')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'months')
                .endOf('month')
                .subtract(1, 'day')
                .subtract(1, 'year')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'monthToDate': {
          return {
            fistValue: {
              fist: moment()
                .startOf('month')

                .utc()
                .format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment().startOf('month').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer)
            }
          };
        }
        case 'lastQuarter':
          return {
            fistValue: {
              fist: moment()
                .startOf('quarter')
                .subtract(1, 'quarter')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'quarter')
                .endOf('quarter')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment().startOf('quarter').subtract(1, 'quarter').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer),
              second: moment().subtract(1, 'quarter').endOf('quarter').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer)
            }
          };
        case 'quarterToDate': {
          return {
            fistValue: {
              fist: moment().startOf('quarter').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment().startOf('quarter').utc().subtract(1, 'year').format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer)
            }
          };
        }
        case 'lastYear':
          return {
            fistValue: {
              fist: moment()
                .startOf('year')
                .subtract(1, 'year')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(1, 'year')
                .endOf('year')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .startOf('year')
                .subtract(2, 'year')
                .utc()

                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .subtract(2, 'year')
                .endOf('year')
                .subtract(1, 'day')
                .utc()

                .format(UtilDate.formatDateTimeServer)
            }
          };
        case 'yearToDate': {
          return {
            fistValue: {
              fist: moment().startOf('year').utc().format(UtilDate.formatDateTimeServer),
              second: moment().endOf('day').utc().format(UtilDate.formatDateTimeServer)
            },
            secondValue: {
              fist: moment()
                .startOf('year')
                .subtract(1, 'year')

                .utc()
                .format(UtilDate.formatDateTimeServer),
              second: moment()
                .endOf('day')
                .subtract(1, 'year')

                .utc()
                .format(UtilDate.formatDateTimeServer)
            }
          };
        }
        default:
          break;
      }
    }
  };
  const getRangerForCustom = () => {
    let setSecondDatePickerSecond;
    let setFirstDatePickerSecond;

    if (activeChooseCompare === 'periodPrevious') {
      const fist = dateFist.endOf('day');

      const second = dateSecond.endOf('day');
      let ranger = second.diff(fist, 'days');

      setSecondDatePickerSecond = dateFist.endOf('day').subtract(1, 'day').utc().format(UtilDate.formatDateTimeServer);

      setFirstDatePickerSecond = dateFist.endOf('day').subtract(ranger, 'day').utc().format(UtilDate.formatDateTimeServer);
    } else if (activeChooseCompare === 'yearPrevious') {
      setFirstDatePickerSecond = dateFist
        .endOf('day')

        .subtract(1, 'year')
        .utc()
        .format(UtilDate.formatDateTimeServer);

      setSecondDatePickerSecond = dateSecond.endOf('day').subtract(1, 'year').utc().format(UtilDate.formatDateTimeServer);
    }
    return {
      fistValue: {
        fist: firstDatePicker,
        second: secondDatePicker
      },
      secondValue: {
        fist: setFirstDatePickerSecond,
        second: setSecondDatePickerSecond
      }
    };
  };
  const checkSubMit = () => {
    const itemChoose = dataSrc.find((data) => data.id === activeChoose);
    let { name } = itemChoose;
    /**cai dat truoc */
    if (activeButton === 1)
      return {
        ...getRanger(),
        fistLabel: name,
        secondLabel: activeChooseCompare === 'periodPrevious' ? strings.previos_period : strings.previos_year
      };
    /**tuy trinh */ else if (activeButton === 2) {
      return {
        ...getRangerForCustom(),
        fistLabel: name,
        secondLabel: activeChooseCompare === 'periodPrevious' ? strings.previos_period : strings.previos_year
      };
    }
  };
  const _handleCheckActive = () => {
    if (activeButton === 1) return false;
    else if (activeButton === 2) {
      let check = false;
      if (getArray(date, undefined, []).length) {
        date.map((val) => {
          if (!val) check = true;
          return val;
        });
      }
      return check;
    }
  };
  const _handleSubmit = () => {
    /**return data for dataRanger label */
    const dataReturn = checkSubMit();
    props.handleVisibleChange();
    props.onChange(dataReturn);
  };
  const _handleChangeDate = (data) => {
    if (getArray(data, undefined, []).length >= 2) {
      setFirstDatePicker(data[0].endOf('day').utc().format(UtilDate.formatDateTimeServer));
      setSecondDatePicker(data[1].endOf('day').utc().format(UtilDate.formatDateTimeServer));
    }
  };
  return (
    <WrapContent>
      <div className="border-title">{strings.date_ranger_title}</div>
      <Button
        onClick={() => {
          setActiveButton(1);
        }}
        className={`button-custom ${activeButton === 1 && 'active-button'}`}
        style={{ borderRight: BORDER }}>
        {strings.presets}
      </Button>
      <Button
        onClick={() => {
          setActiveButton(2);
        }}
        style={{ borderBottom: BORDER }}
        className={`button-custom ${activeButton === 2 && 'active-button'}`}>
        {strings.custom}
      </Button>
      {activeButton === 1 &&
        dataSrc.map((item) => (
          <div
            role="presentation"
            className={`item ${activeChoose === item.id && 'active-choose'}`}
            key={item.id}
            onClick={() => _handleChoose(item)}>
            {activeChoose === item.id && <div className="square" />}
            {item.name}
          </div>
        ))}
      {activeButton === 2 && (
        <Space direction="vertical" style={{ width: '100%', border: 'none' }}>
          <RangePicker
            style={{
              width: '100%',
              border: 'none',
              borderRight: BORDER,
              borderTop: BORDER,
              borderBottom: BORDER
            }}
            value={date}
            disabledDate={(current) => current && current > moment().endOf('day')}
            onChange={_handleChangeDate}
          />
        </Space>
      )}
      <div className="compare">{strings.compare_to}</div>
      <div
        role="presentation"
        className={`item ${activeChooseCompare === 'periodPrevious' && 'active-choose'}`}
        onClick={() => _handleChooseCompare('periodPrevious')}>
        {activeChooseCompare === 'periodPrevious' && <div className="square" />}
        {strings.previos_period}
      </div>
      <div
        role="presentation"
        className={`item ${activeChooseCompare === 'yearPrevious' && 'active-choose'}`}
        onClick={() => _handleChooseCompare('yearPrevious')}>
        {activeChooseCompare === 'yearPrevious' && <div className="square" />}
        {strings.previos_year}
      </div>
      <div className="compare" style={{ height: '60px' }}>
        <Button onClick={_handleSubmit} style={{ width: '120px' }} type="primary" disabled={_handleCheckActive()}>
          {strings.update}
        </Button>
      </div>
    </WrapContent>
  );
};
/**
 * @author viet
 * @param {label} props
 * @component content is content of DataRanger
 */
const DataRanger = (props) => {
  const { label } = props;
  /** value mac dinh */
  const [fistCompare, setFistCompare] = useState('Mặc định');
  const [rotate, setRotate] = useState(0);
  const [secondCompare, setSecondCompare] = useState('Mặc định');
  const [visible, setVisible] = useState(false);
  const _handleVisibleChange = () => {
    if (!visible) setRotate(180);
    else setRotate(360);

    setVisible(!visible);
  };
  const _handleOnChange = (data) => {
    props.hanldeChange(data);
    setFistCompare(
      `${data.fistLabel}(${UtilDate.toDateLocal(data.fistValue.fist)}${
        data.fistValue.second && ` - ${UtilDate.toDateLocal(data.fistValue.second)}`
      })`
    );
    setSecondCompare(
      `${data.secondLabel}(${UtilDate.toDateLocal(data.secondValue.fist)}${
        data.secondValue.second && ` - ${UtilDate.toDateLocal(data.secondValue.second)}`
      })`
    );
  };

  return (
    <FieldStyle label={label}>
      <Popover
        trigger="click"
        placement="bottom"
        content={<Content handleVisibleChange={_handleVisibleChange} onChange={_handleOnChange} />}
        visible={visible}
        onVisibleChange={_handleVisibleChange}>
        <Button onClick={_handleVisibleChange}>
          <DownOutlined rotate={rotate} className="icon-expand" />

          <span style={{ fontWeight: 600 }}>{fistCompare.replace(null, '')}</span>
          <span>vs. {secondCompare.replace(null, '')}</span>
        </Button>
      </Popover>
    </FieldStyle>
  );
};

export default DataRanger;
