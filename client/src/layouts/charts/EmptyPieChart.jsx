/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';

const EmptyPieChart = ({ width, height, data, innerRadius, outerRadius, per }) => {
  let val;
  if (per) {
    val = '%';
  } else {
    val = '/10';
  }
  return (
    <ResponsiveContainer width={ width || 200} height={height || 200}>
      <PieChart width={width || 300} height={height || 300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={50}
          fill="#f4f4f4"
        >
          <Cell key={`cell`} fill="#007B55" />
          <Label
            value={`${data[0].value}${val}`}
            position="center"
            fill="#212B36"
            style={{
              fontSize: '25px',
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
