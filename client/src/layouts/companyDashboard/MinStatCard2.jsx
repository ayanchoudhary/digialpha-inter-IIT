/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import TinyLineChart from '@layouts/charts/TinyLineChart';
import TinyBarChart from '@layouts/charts/TinyBarChart';
import TinyPieChart from '@layouts/charts/TinyPieChart';

const MinStatCard2 = ({ label, value, delta, graphType, graphData, bgcolor, color }) => {
  const isDeltaPositive = delta > 0;
  const chartColor = isDeltaPositive ? '#00BFA6' : '#FF5252';
  // console.log(if(delta))
  // document.getElementsByClassName("card").style.backgroundColor = bgcolor;
  // document.getElementsByClassName("card").style.color = color;
  return (
    <div
      className="p-6 mr-4 my-6 rounded-md soft-box-shadow flex flex-col justify-between"
      style={{ backgroundColor: `${bgcolor}`, color: `${color}` }}
    >
      {/* <div> */}
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-bold">{label}</p>
          <p className="text-3xl font-bold mt-4 mb-2">{value}</p>
        </div>
        {delta?
          <div className="text-sm flex items-center">
            {isDeltaPositive ? <TrendUp /> : <TrendDown />}{' '}
            <span className="font-bold ml-2">{delta}%&nbsp;</span> than last year
          </div> :
          <div></div>
        }
      </div>
      <div>{graphType === 'line' ? <TinyLineChart stroke={color} /> : <TinyPieChart />}</div>
      {/* </div> */}
    </div>
  );
};

export default MinStatCard2;
