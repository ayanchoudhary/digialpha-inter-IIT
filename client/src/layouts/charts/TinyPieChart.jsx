import React, { PureComponent } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  ResponsiveContainerProps,
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#826AF9', '#00AB55'];

const TinyPieChart = () => (
  <ResponsiveContainer width={200} height={200}>
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={70}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export default TinyPieChart;
