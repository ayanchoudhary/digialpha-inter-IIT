/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ltv = [
  { name: 'LTV', value: 75 },
  { name: 'Left', value: 25 },
];

const cac = [
  { name: 'cac', value: 50 },
  { name: 'Left', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#826AF9', '#00AB55'];

const PieComparison = ({ fullWidth }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 200} height={300}>
    <PieChart width={200} height={200}>
      <Pie data={cac} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={70}>
        {cac.map((entry, index) => {
          if (index === 1) {
            return <Cell key={`cell-${index}`} fill="#919EAB" opacity={0.25} />; // make sure to map the index to the colour you want
          }
          return <Cell key={`cell-${index}`} fill="#B78103" />;
        })}
      </Pie>
      <Pie data={ltv} dataKey="value" cx="50%" cy="50%" innerRadius={75} outerRadius={90}>
        {ltv.map((entry, index) => {
          if (index === 1) {
            return <Cell key={`cell-${index}`} fill="#919EAB" opacity={0.25} />; // make sure to map the index to the colour you want
          }
          return <Cell key={`cell-${index}`} fill="#007B55" />;
        })}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default PieComparison;
