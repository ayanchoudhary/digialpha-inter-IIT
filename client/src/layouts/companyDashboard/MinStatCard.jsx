/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import TinyLineChart from '@layouts/charts/TinyLineChart';
import TinyBarChart from '@layouts/charts/TinyBarChart';

const MinStatCard = ({ label, value, delta, graphType, graphData }) => {
  const isDeltaPositive = delta > 0;
  const chartColor = isDeltaPositive ? '#00BFA6' : '#FF5252';
  return (
    <div className="p-6 mr-4 my-6 rounded-md soft-box-shadow flex miniStatCard justify-between flex-shrink-0 bg-white">
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-4 mb-2">{value}</p>
        <div className="text-sm text-gray-600 flex items-center">
          {isDeltaPositive ? <TrendUp /> : <TrendDown />}{' '}
          <span className="font-bold text-gray-800 ml-2">{delta}%&nbsp;</span> than last year
        </div>
      </div>
      <div>
        {graphType === 'line' ? (
          <TinyLineChart stroke={chartColor} />
        ) : (
          <TinyBarChart fill={chartColor} />
        )}
      </div>
    </div>
  );
};

export default MinStatCard;
