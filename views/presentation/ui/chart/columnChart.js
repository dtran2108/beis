import React from 'react';
import { Chart, Tooltip, Interval, View, Line } from 'bizcharts';
import styled from 'styled-components';
import strings from '~/localization';
import { Color } from '~/views/utils/layout';

const WrapChart = styled.div`
  background: ${Color.white};
  margin-bottom: 48px;
  .chart {
    padding: 16px 16px 16px 0px;
  }
  .title {
    background-color: ${Color.white};
    margin: 0;
    padding: 8px;
    border-bottom: 1px solid ${Color.divider};
    color: ${Color.black} !important;
    font-size: 16px;
  }
  .chart {
    padding: 16px 12px 16px 12px;
  }
`;

export default class ColumnChart extends React.Component {
  render() {
    const data = [
      { name: 'London', month: 'Jan.', monthAverageRain: 18.9 },
      { name: 'London', month: 'Feb.', monthAverageRain: 28.8 },
      { name: 'London', month: 'Mar.', monthAverageRain: 39.3 },
      { name: 'London', month: 'Apr.', monthAverageRain: 81.4 },
      { name: 'London', month: 'May', monthAverageRain: 47 },
      { name: 'London', month: 'Jun.', monthAverageRain: 20.3 },
      { name: 'London', month: 'Jul.', monthAverageRain: 24 },
      { name: 'London', month: 'Aug.', monthAverageRain: 35.6 },
      { name: 'Berlin', month: 'Jan.', monthAverageRain: 12.4 },
      { name: 'Berlin', month: 'Feb.', monthAverageRain: 23.2 },
      { name: 'Berlin', month: 'Mar.', monthAverageRain: 34.5 },
      { name: 'Berlin', month: 'Apr.', monthAverageRain: 99.7 },
      { name: 'Berlin', month: 'May', monthAverageRain: 52.6 },
      { name: 'Berlin', month: 'Jun.', monthAverageRain: 35.5 },
      { name: 'Berlin', month: 'Jul.', monthAverageRain: 37.4 },
      { name: 'Berlin', month: 'Aug.', monthAverageRain: 42.4 }
    ];
    const average = data.reduce((pre, item) => {
      const { month, monthAverageRain } = item;
      if (!pre[month]) {
        pre[month] = 0;
      }
      pre[month] += monthAverageRain;
      return pre;
    }, {});

    const averageData = Object.keys(average).map((key) => {
      return { month: key, averageRain: Number((average[key] / 2).toFixed(2)) };
    });

    const scale = {
      month: {},
      averageRain: {
        min: 0,
        max: 100,
        alias: 'Average'
      },
      monthAverageRain: {
        min: 0,
        max: 100
      }
    };

    const { title } = this.props;
    return (
      <WrapChart className="d-flex flex-column justify-content-start align-items-start shadow w-100">
        <h4 className="title w-100">{title ? title : strings.default_chart_title} </h4>
        <Chart height={350} scale={scale} padding="auto" autoFit className="chart">
          <Tooltip shared />
          <View data={data}>
            <Interval
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 0
                }
              ]}
              color="name"
              position="month*monthAverageRain"
            />
          </View>
          <View data={averageData}>
            <Line position="month*averageRain" color="orange" />
          </View>
        </Chart>
      </WrapChart>
    );
  }
}
