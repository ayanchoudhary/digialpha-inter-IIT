/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#826AF9', '#00AB55'];

const TinyPieChart = ({ fullWidth }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 120} height={200}>
    <PieChart width={120} height={120}>
      <Pie data={data} dataKey="value" outerRadius={70}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default TinyPieChart;
