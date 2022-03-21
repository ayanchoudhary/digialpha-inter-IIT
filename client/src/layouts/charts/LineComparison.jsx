import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

// const data = [
//   {
//     name: 'Quarter 1',
//     'New MRR': 4000,
//     'Churnned MRR': 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Quarter 2',
//     'New MRR': 3000,
//     'Churnned MRR': 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Quarter 3',
//     'New MRR': 2000,
//     'Churnned MRR': 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Quarter 4',
//     'New MRR': 2780,
//     'Churnned MRR': 3908,
//     amt: 2000,
//   },
// ];

const LineComparison = ({ data1, data2, val1, val2, color1, color2 }) => {
  let data = [];
  for (let i = 0; i < data1.length; i++) {
    let obj = {};
    obj['name'] = i;
    obj[`${val1}`] = data1[i][`${val1}`];
    obj[`${val2}`] = data2[i][`${val2}`];
    data.push(obj);
  }

  return (
    <div>
      <LineChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Legend />
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} />
        <YAxis axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey={val1} stroke={color1} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey={val2} stroke={color2} strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  );
};

LineComparison.propTypes = {
  data1: PropTypes.array,
  data2: PropTypes.array,
  val1: PropTypes.string,
  val2: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

export default LineComparison;
