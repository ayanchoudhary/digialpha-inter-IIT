/* eslint-disable react/prop-types */
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const TinyBarChart = ({ fill, graphData, val }) => (
  <ResponsiveContainer width={100} height="80%">
    <BarChart width={120} height={120} data={graphData}>
      <Tooltip />
      <Bar dataKey={val} fill={fill} barSize={5} radius={100} />
      <XAxis dataKey="date" hide />
    </BarChart>
  </ResponsiveContainer>
);

export default TinyBarChart;
