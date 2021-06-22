import React, { memo } from 'react';
import { AreaChart as Chart, ResponsiveContainer, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
};

const wrapperStyle = {
  width: '600px',
  height: '600px'
};
const AreaChart = ({ data, fills, xLabel, margin, strokes, xPadding, dataKeys, wrapperClassName }) => {
  return (
    <div className={`parent-wrapper${wrapperClassName ? ` ${wrapperClassName}` : ''}`} style={wrapperStyle}>
      <ResponsiveContainer>
        <Chart
          {...{
            data,
            margin
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis height={60} dataKey={xLabel} tick={CustomizedAxisTick} padding={xPadding} />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((dataKey, index) => (
            <Area
              key={index}
              type="monotone"
              {...{
                key: index,
                dataKey,
                // stackId: 1,
                fill: fills[index],
                stroke: strokes[index]
              }}
            />
          ))}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(AreaChart);
