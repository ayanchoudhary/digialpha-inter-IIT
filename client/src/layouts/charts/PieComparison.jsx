/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#826AF9', '#00AB55'];

const PieComparison = ({ fullWidth }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 120} height={200}>
    <PieChart width={200} height={200}>
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={55}
        outerRadius={70}
        fill="#B78103"
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={75}
        outerRadius={90}
        fill="#007B55"
      />
    </PieChart>
  </ResponsiveContainer>
);

export default PieComparison;
