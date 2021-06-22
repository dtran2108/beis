import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
];

const DescriptionView = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  div {
    height: 20px;
    width: 40px;
  }
  span {
    margin-left: 10px;
    color: gray;
  }
  @media (max-width: 1300px) {
    justify-content: center;
  }
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ChartsPage extends React.Component {
  render() {
    return (
      <div className="row d-flex flex-md-row flex-column align-items-center">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="ml-3 text-center">
          {data.map((entry, index) => (
            <DescriptionView key={`cell-${index}`}>
              <div style={{ background: COLORS[index % COLORS.length] }} />
              <span>{entry.name || ''}</span>
            </DescriptionView>
          ))}
        </div>
      </div>
    );
  }
}

export default ChartsPage;
