/* eslint-disable react/prop-types */
import { truncateDatapoints } from '@utils/utils';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#826AF9', '#00AB55'];

const TinyPieChart = ({ fullWidth, graphData, val }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 120} height={300}>
    <PieChart width={120} height={120}>
      <Pie data={truncateDatapoints(graphData, val)} dataKey={val} nameKey="date" outerRadius={70}>
        {truncateDatapoints(graphData).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default TinyPieChart;
