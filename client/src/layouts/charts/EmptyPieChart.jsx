/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';
import { preciseRoundOff } from '@utils/utils';

const EmptyPieChart = ({ width, height, data, innerRadius, outerRadius, per }) => {
  let val;
  if (per) {
    val = '%';
  } else {
    val = '/10';
  }
  
  return (
    <ResponsiveContainer width={width || 200} height={height || 200}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={50}
          fill="#000000"
          opacity={0.15}
        >
          <Cell key={`cell`} fill="#007B55" opacity={1}/>
          <Label
            // value={`${preciseRoundOff(data[0].value)}%`}
            value={`${data[0].value}${val}`}
            position="center"
            fill={per? '#212B36' : '#FFF'}
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EmptyPieChart;
