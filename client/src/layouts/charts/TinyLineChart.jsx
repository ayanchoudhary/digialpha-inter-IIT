/* eslint-disable react/prop-types */
import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const TinyLineChart = ({ stroke, fullWidth, graphData, val, labelFormatter, formatter }) => (
  <ResponsiveContainer width={fullWidth ? '100%' : 120} height="100%">
    <LineChart width={120} height={120} data={graphData}>
      <Tooltip labelFormatter={labelFormatter} formatter={formatter} />
      <Line type="monotone" dataKey={val} stroke={stroke} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export default TinyLineChart;
