import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const LargeBarChart = ({ data, val }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3" vertical={false} />
      <XAxis
        axisLine={false}
        tickLine={false}
        tickMargin={20}
        tick={{ fill: '#919EAB' }}
        dataKey="date"
      />
      <YAxis axisLine={false} tickLine={false} tickMargin={20} tick={{ fill: '#919EAB' }} />
      <Tooltip />
      <Bar dataKey={val} fill="#00AB55" width={8} barSize={5} radius={100} />
    </BarChart>
  </ResponsiveContainer>
);

LargeBarChart.propTypes = {
  data: PropTypes.array,
  val: PropTypes.string,
};

export default LargeBarChart;
