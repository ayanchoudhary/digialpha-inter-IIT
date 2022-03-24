/* eslint-disable react/prop-types */
import { min } from 'lodash';
import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const TinyLineComparison = ({ color1, color2, data1, data2, val }) => {
  console.log(data1[0][`${val}`]);
  // console.log(data2)
  let data = [];
  let lim1 = data1.length;
  let lim2 = data2.length;
  let limit = min([lim1, lim2]);
  for (let i = 1; i < limit; i++) {
    let obj = {};
    obj['name'] = i;
    obj[`${val}`] = data1[lim1-i][`${val}`];
    obj[`${val}`] = data2[lim2-i][`${val}`];
    data.push(obj);
  }
  return (
    <ResponsiveContainer width={120} height="100%">
      <LineChart width={120} height={120} data={data}>
        <Tooltip />
        <Line type="monotone" dataKey={val} stroke={color1} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey={val} stroke={color2} strokeWidth={2} dot={false} />
        <XAxis dataKey="date" hide />
      </LineChart>
    </ResponsiveContainer>
  );
  // return <></>;
};

export default TinyLineComparison;
