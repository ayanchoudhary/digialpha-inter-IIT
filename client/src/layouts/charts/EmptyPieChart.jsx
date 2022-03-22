/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';
import { preciseRoundOff } from '@utils/utils';

const EmptyPieChart = ({ fullWidth, data, innerRadius, outerRadius }) => {
  return (
    <ResponsiveContainer width={fullWidth ? '100%' : 200} height={fullWidth ? '100%' : 200}>
      <PieChart width={300} height={300}>
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
            value={`${preciseRoundOff(data[0].value)}%`}
            position="center"
            fill="#212B36"
            style={{
              fontSize: '30px',
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
