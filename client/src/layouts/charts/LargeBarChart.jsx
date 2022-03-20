import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const LargeBarChart = ({data, val}) => (
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
        dataKey="name"
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
}

export default LargeBarChart;
