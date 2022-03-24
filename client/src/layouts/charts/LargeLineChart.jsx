import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const LargeLineChart = ({ data, val }) => {
  // console.log(data)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
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
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickMargin={20}
          tick={{ fill: '#919EAB' }}
        />
        <YAxis axisLine={false} tickLine={false} tickMargin={20} tick={{ fill: '#919EAB' }} />
        <Tooltip />
        <Line type="monotone" dataKey={val} stroke="#82ca9d" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

LargeLineChart.propTypes = {
  data: PropTypes.array,
  val: PropTypes.string,
};

export default LargeLineChart;
