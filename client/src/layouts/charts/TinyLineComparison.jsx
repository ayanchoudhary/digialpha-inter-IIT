/* eslint-disable react/prop-types */
import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const TinyLineComparison = ({
  color1,
  color2,
  fullWidth,
  data1,
  data2,
  val1,
  val2,
}) => {
  let data = [];
  for (let i = 0; i < data1.length; i++) {
    let obj = {};
    obj['name'] = i;
    obj[`${val1}`] = data1[i][`${val1}`];
    obj[`${val2}`] = data2[i][`${val2}`];
    data.push(obj);
  }
  return (
    <ResponsiveContainer width={fullWidth ? '100%' : 120} height="100%">
      <LineChart width={120} height={120} data={data}>
        <Tooltip />
        <Line type="monotone" dataKey={val1} stroke={color1} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey={val2} stroke={color2} strokeWidth={2} dot={false} />
        <XAxis dataKey="date" hide />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineComparison;
