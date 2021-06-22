import React from 'react';
import { compose, withState, withHandlers, pure, lifecycle } from 'recompose';

import strings from '~/localization';
import _ from 'lodash';

import styled from 'styled-components';
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { DataRang, LoadingRanger, TitleCustom } from '~/views/presentation/ui/dashboard';
import { numberFormatWithPoint, numberFormatWithPointFloat } from '~/views/utils/helpers/currency';
import { Color } from '~/views/utils/layout';
import { withRouter } from 'next/router';
import moment from 'moment';
import { getNumber, getString } from '~/views/utils/helpers/utilObject';
import UtilDate from '~/views/utils/helpers/UtilDate';

const WrapPerformance = styled.div`
  margin-bottom: 32px;
  .up {
    color: ${Color.success} !important;
  }
  .down {
    color: ${Color.error} !important;
  }
  .none {
    color: ${Color.primaryText} !important;
  }
  .font-size {
    font-size: 25px;
  }
`;

const statusArrow = {
  UP: 'up',
  DOWN: 'down',
  NONE: 'none'
};

const startDateDefault = '1999-12-12';
const endDateDefault = moment.utc(moment(), UtilDate.formatDateTimeServer).format(UtilDate.formatDateServer);

const Performance = (props) => {
  const _handleChange = (data) => {
    const query = {
      endDate: moment
        .utc(getString(data, 'firstValue.first', startDateDefault), UtilDate.formatDateTimeServer)
        .format(UtilDate.formatDateServer),
      startDate: moment
        .utc(getString(data, 'secondValue.first', endDateDefault), UtilDate.formatDateTimeServer)
        .format(UtilDate.formatDateServer)
    };
    const { setLoading, setQuery, fetchPerformance } = props;
    setQuery(query);
    setLoading(true);
    fetchPerformance(query);
  };

  const renderArrow = (status, percent) => {
    if (status === statusArrow.UP)
      return (
        <>
          <ArrowUpOutlined className={`${status}  `} style={{ fontSize: 24 }} />
          <span className={`fist-name square ${status}`}>{`${
            percent === parseInt(percent) ? numberFormatWithPoint(percent) : numberFormatWithPointFloat(percent)
          }%`}</span>
        </>
      );
    else if (status === statusArrow.DOWN)
      return (
        <>
          <ArrowDownOutlined className={`${status}`} style={{ fontSize: 24 }} />
          <span className={`fist-name square ${status}`}>{`${
            percent === parseInt(percent) ? numberFormatWithPoint(percent) : numberFormatWithPointFloat(percent)
          }%`}</span>
        </>
      );
    else
      return (
        <>
          <ArrowRightOutlined className={`${status}`} style={{ fontSize: 24 }} />
          <span className={`fist-name square ${status}`}>{`${
            percent === parseInt(percent) ? numberFormatWithPoint(percent) : numberFormatWithPointFloat(percent)
          }%`}</span>
        </>
      );
  };

  const renderPerformance = () => {
    const { performances } = props;
    return performances.map((v, i) => {
      return (
        <div key={i} className="item-ecom col-lg-3 col-md-4 col-12">
          <div className="ecom-fist mb-4">
            <div className="fist-name text-uppercase">{v.title}</div>
            <div>
              <span className=" color-b ">{`${
                v.current === parseInt(v.current) ? numberFormatWithPoint(v.current) : numberFormatWithPointFloat(v.current)
              } ${v.unit}`}</span>
              <div className="float-right">{renderArrow(v.status, v.percentValue)}</div>
            </div>
          </div>
          <div className="ecom-fist">
            <div className="fist-name text-capitalize">{v.subTitle}</div>
            <div>
              <span className="color-gray">{`${numberFormatWithPoint(v.earlier)} ${v.unit}`}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderEmptyPerformance = () => {
    const { performances } = props;
    const arrT = _.fill(Array(4 - (performances.length % 4)), 0);
    return arrT.map((v, i) => {
      return <div key={i} className="item-ecom last col-lg-3 col-md-4 col-0"></div>;
    });
  };

  const { title = '', loading = false } = props;

  return (
    <WrapPerformance>
      <DataRang handleChange={_handleChange} label={strings.dashboard_data_range} />
      <TitleCustom title={title} slot={<div></div>} />
      {loading && <LoadingRanger />}
      {!loading && (
        <div className="per-ecom">
          <div className="row">
            {renderPerformance()}

            {renderEmptyPerformance()}
          </div>
        </div>
      )}
    </WrapPerformance>
  );
};

const initState = {
  data: [],
  value: undefined
};

export default compose(
  withRouter,
  pure,
  withState('state', 'setState', (props) => (props.defaultValue ? props.defaultValue : initState)),
  withState('performances', 'setPerformances', []),
  withState('loading', 'setLoading', false),
  withState('query', 'setQuery', { startDate: '2020-08-27', endDate: '2020-09-01' }),
  withHandlers({
    fetchPerformance: (props) => () => {
      const { setPerformances, arrPerformance = [], setLoading } = props;

      setLoading(true);

      // return status arrow percent
      const calStatus = (current, earlier) => {
        const value = current - earlier;
        let status = statusArrow.NONE;
        if (value > 0) status = statusArrow.UP;
        else if (value < 0) status = statusArrow.DOWN;
        return status;
      };

      setPerformances(
        arrPerformance.map((v) => {
          return {
            ...v,
            status: calStatus(getNumber(v, 'current', 0), getNumber(v, 'earlier', 0)),
            percentValue: Math.abs(100 - (getNumber(v, 'current', 0) / getNumber(v, 'earlier', 0)) * 100)
          };
        })
      );
      setLoading(false);

      // TODO Sau khi anh Nam check lại API: /services/godi-services/api/v1/manufacturer/dashboard?endDate=2020-12-12&startDate=2020-01-01 thì cần map data
      // fetchData(query)
      //     .then(({ res }) => {
      //         const response = getArray(res, undefined, []);

      //         const currentData = getObject(_.head(response));
      //         const earlierData = getObject(_.last(response));
      //         if (!props.isDashboardECommerce)
      //             setPerformances([
      //                 {
      //                     title: strings.total_production,
      //                     unit: strings.unit_price_d,
      //                     subTitle: strings.previous_period,
      //                     current: getNumber(currentData, "sale", 0),
      //                     earlier: getNumber(earlierData, "sale", 0),
      //                     status: calStatus(getNumber(currentData, "sale", 0), getNumber(earlierData, "sale", 0)),
      //                 },
      //                 {
      //                     title: strings.production_by_season,
      //                     unit: "",unit: strings.unit_price_d,
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "revenue", 0),
      //                     earlier: getNumber(earlierData, "revenue", 0),
      //                     status: calStatus(getNumber(currentData, "revenue", 0), getNumber(earlierData, "revenue", 0)),
      //                 },
      //                 {
      //                     title: strings.medium_quantity,
      //                     unit: "",
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "totalOrder", 0),
      //                     earlier: getNumber(earlierData, "totalOrder", 0),
      //                     status: calStatus(getNumber(currentData, "totalOrder", 0), getNumber(earlierData, "totalOrder", 0)),
      //                 },
      //                 {
      //                     title: strings.cost,
      //                     unit: strings.unit_price_d,
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "sale", 0) / getNumber(currentData, "totalOrder", 0),
      //                     earlier: getNumber(earlierData, "sale", 0) / getNumber(earlierData, "totalOrder", 0),
      //                     status: calStatus(
      //                         getNumber(currentData, "sale", 0) / getNumber(currentData, "totalOrder", 0),
      //                         getNumber(earlierData, "sale", 0) / getNumber(earlierData, "totalOrder", 0)
      //                     ),
      //                 },
      //                 {
      //                     title: strings.revenue,
      //                     unit: "",
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "allProductTrading", 0),
      //                     earlier: getNumber(earlierData, "allProductTrading", 0),
      //                     status: calStatus(
      //                         getNumber(currentData, "allProductTrading", 0),
      //                         getNumber(earlierData, "allProductTrading", 0)
      //                     ),
      //                 },
      //                 {
      //                     title: strings.profit,
      //                     unit: "",
      //                     subTitle: strings.last_year,
      //                     current: getNumber(currentData, "allStore", 0),
      //                     earlier: getNumber(earlierData, "allStore", 0),
      //                     status: calStatus(getNumber(currentData, "allStore", 0), getNumber(earlierData, "allStore", 0)),
      //                 },
      //             ]);
      //         else {
      //             // TODO Chỗ này cần phải set data vào khi có API tổng quan thương mại

      //             setPerformances([
      //                 {
      //                     title: strings.total_production,
      //                     unit: strings.unit_price_d,
      //                     subTitle: strings.previous_period,
      //                     current: getNumber(currentData, "fakeData", 0),
      //                     earlier: getNumber(earlierData, "fakeData", 0),
      //                     status: calStatus(getNumber(currentData, "fakeData", 0), getNumber(earlierData, "fakeData", 0)),
      //                 },
      //                 {
      //                     title: strings.production_by_season,
      //                     unit: strings.unit_price_d,
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "fakeData", 0),
      //                     earlier: getNumber(earlierData, "fakeData", 0),
      //                     status: calStatus(getNumber(currentData, "fakeData", 0), getNumber(earlierData, "fakeData", 0)),
      //                 },
      //                 {
      //                     title: strings.medium_quantity,
      //                     unit: "",
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "fakeData", 0),
      //                     earlier: getNumber(earlierData, "fakeData", 0),
      //                     status: calStatus(getNumber(currentData, "fakeData", 0), getNumber(earlierData, "fakeData", 0)),
      //                 },
      //                 {
      //                     title: strings.cost,
      //                     unit: strings.unit_price_d,
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "fakeData", 0),
      //                     earlier: getNumber(earlierData, "fakeData", 0),
      //                     status: calStatus(getNumber(currentData, "fakeData", 0), getNumber(earlierData, "fakeData", 0)),
      //                 },
      //                 {
      //                     title: strings.revenue,
      //                     unit: "",
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "fakeData", 0),
      //                     earlier: getNumber(earlierData, "fakeData", 0),
      //                     status: calStatus(getNumber(currentData, "fakeData", 0), getNumber(earlierData, "fakeData", 0)),
      //                 },
      //                 {
      //                     title: strings.profit,
      //                     unit: "",
      //                     subTitle: strings.season_ago,
      //                     current: getNumber(currentData, "fakeData", 0),
      //                     earlier: getNumber(earlierData, "fakeData", 0),
      //                     status: calStatus(getNumber(currentData, "fakeData", 0), getNumber(earlierData, "fakeData", 0)),
      //                 },
      //             ]);
      //         }

      //         setLoading(false);
      //     })
      //     .catch((err) => {
      //         console.error("fetchPerformance -> err", err);
      //         setLoading(false);
      //         showError(err);
      //     });
    }
  }),
  lifecycle({
    componentDidMount() {
      const { fetchPerformance, query } = this.props;

      fetchPerformance(query);
    }
  })
)(Performance);
