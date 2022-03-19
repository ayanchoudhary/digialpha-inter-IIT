/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Group A', value: 40 },
  { name: 'Group B', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#826AF9', '#00AB55'];

const EmptyPieChart = ({ fullWidth }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 120} height={200}>
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        dataKey="value" // make sure to map the dataKey to "value"
        innerRadius={60} // the inner and outer radius helps to create the progress look
        outerRadius={80}
      >
        {data.map((entry, index) => {
          if (index === 1) {
            return <Cell key={`cell-${index}`} fill="#919EAB" opacity={0.16} />; // make sure to map the index to the colour you want
          }
          return <Cell key={`cell-${index}`} fill="green" />;
        })}
        <Label
          value={data[0].value}
          position="center"
          fill="grey"
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
          }}
        />
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export default EmptyPieChart;
