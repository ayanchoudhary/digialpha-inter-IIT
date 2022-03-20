/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Label } from 'recharts';

const PieComparison = ({ fullWidth, val1, val2, label, legendPayload }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 200} height={300}>
    <PieChart width={200} height={200}>
      <Pie
        data={val1}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={55}
        outerRadius={70}
        startAngle={90}
        endAngle={450}
      >
        {val1.map((entry, index) => {
          if (index === 1) {
            return <Cell key={`cell-${index}`} fill="#919EAB" opacity={0.25} />; // make sure to map the index to the colour you want
          }
          return <Cell key={`cell-${index}`} fill="#B78103" />;
        })}
        <Label
          value={label}
          position="center"
          fill="#212B36"
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
          }}
        />
      </Pie>
      <Pie
        data={val2}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={75}
        outerRadius={90}
        startAngle={90}
        endAngle={450}
      >
        {val2.map((entry, index) => {
          if (index === 1) {
            return <Cell key={`cell-${index}`} fill="#919EAB" opacity={0.25} />; // make sure to map the index to the colour you want
          }
          return <Cell key={`cell-${index}`} fill="#007B55" />;
        })}
      </Pie>
      <Legend payload={legendPayload} />
    </PieChart>
  </ResponsiveContainer>
);

export default PieComparison;
