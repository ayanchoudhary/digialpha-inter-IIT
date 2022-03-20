/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';

const EmptyPieChart = ({ fullWidth, data, innerRadius, outerRadius, val }) => {
  return (
    <ResponsiveContainer width={fullWidth ? '100%' : 200} height={fullWidth ? '100%' : 200}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey={val} // make sure to map the dataKey to "value"
          innerRadius={innerRadius} // the inner and outer radius helps to create the progress look
          outerRadius={outerRadius}
          cornerRadius={50}
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
              color: '#212B36',
            }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EmptyPieChart;
