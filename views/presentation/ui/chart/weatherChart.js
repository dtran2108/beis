import React from 'react';
import { Chart, Geom, Axis, Tooltip, Annotation } from 'bizcharts';
import _ from 'lodash';
import styled from 'styled-components';
import strings from '~/localization';
import { Color } from '~/views/utils/layout';

const WrapChart = styled.div`
  background: ${Color.white};
  margin-bottom: 48px;
  .chart {
    padding: 16px 16px 16px 0px;
  }
`;

// Data actually used by the business. If you want to use this chart, you need:
// 1. Change this data to interface data
// 2. If the data fields are different, you need to modify all the fields with the same name below, such as count -> xxxCount, then all counts below must be modified
const data = _.range(30).map((i) => {
  return {
    date: `2020-9-${i + 1}`, // id date
    count: _.random(23, 32), //is count
    alert: i % 5 === 0 ? true : false
  };
});

function getDivideRate(data, field, divideValue) {
  const values = data.reduce((pre, item) => {
    if (item[field]) {
      pre.push(item[field]);
    }
    return pre;
  }, []);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  return ((maxValue - divideValue) / (maxValue - minValue)).toFixed(4);
}

export default class WeatherChart extends React.Component {
  render() {
    // const alertLine = [...data].map((item) => {
    //   if (item.alert) {
    //     return item;
    //   }
    //   return {
    //     ...item,
    //     count: null
    //   };
    // });

    var scale = {
      date: {
        alias: 'date',
        type: 'time'
      },
      count: {
        alias: 'frequency',
        // Due to the use of different Views, you need to set the min and max of the scale
        min: 23,
        max: 33
      },
      pre_count: {
        alias: 'frequency2',
        // Due to the use of different Views, you need to set the min and max of the scale
        min: 23,
        max: 33
      }
    };

    const warningValue = 28;
    const divideRate = getDivideRate(data, 'count', warningValue);
    const preDivideRate = getDivideRate(data, 'pre_count', warningValue);
    const colors = ['#FF8060', '#6BA8FF'];
    const { title, height } = this.props;
    return (
      <WrapChart className="d-flex flex-column justify-content-start align-items-start shadow w-100">
        <h4 className="title w-100">{title ? title : strings.default_chart_title} </h4>
        <Chart height={height || 300} autoFit data={data} scale={scale} className="chart">
          <Tooltip showCrosshairs />
          <Axis name="count" />
          <Geom
            type="line"
            position="date*count"
            color={`l(90) 0:${colors[0]} ${divideRate}:${colors[0]} ${divideRate}:${colors[1]} 1:${colors[1]}`}
          />
          <Geom
            type="line"
            style={{
              lineDash: [4, 2]
            }}
            position="date*pre_count"
            color={`l(90) 0:${colors[0]} ${preDivideRate}:${colors[0]} ${preDivideRate}:${colors[1]} 1:${colors[1]}`}
          />
          <Annotation.Line
            start={['min', warningValue]}
            end={['max', warningValue]}
            text={{
              // The text position, in addition to specifying'start','center' and'end', you can also use percentages for positioning, such as '30%'
              position: 'end',
              // Text content displayed
              content: `${warningValue}`,
              offsetX: -30,
              offsetY: -5,
              style: {
                fill: colors[0]
              }
            }}
            style={{
              lineDash: [2, 4],
              stroke: colors[0]
            }}
          />
        </Chart>
      </WrapChart>
    );
  }
}
