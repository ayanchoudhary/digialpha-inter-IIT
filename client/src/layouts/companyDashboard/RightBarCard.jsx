/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import TinyLineChart from '@layouts/charts/TinyLineChart';
import TinyPieChart from '@layouts/charts/TinyPieChart';
import LineComparison from '../charts/LineComparison';
import EmptyPieChart from '../charts/EmptyPieChart';
import PieComparison from '../charts/PieComparison';

const data = [
  { name: 'Group A', value: 40 },
  { name: 'Group B', value: 60 },
];

const nps = [
  { name: 'NPS Score', value: 8 },
  { name: 'Left', value: 2 },
];

const RightBarCard = () => (
  <div className="flex flex-col">
    {/* <div
      className="rightColCard flex flex-row items-center rounded-3xl flex-shrink-0 h-36 gap-8 m-6"
      style={{ backgroundColor: '#005249', color: 'white' }}
    >
      <div style={{width: }}>
        <EmptyPieChart data={data} innerRadius={20} outerRadius={25} fullWidth />
      </div>
      <div>
        <div className="text-3xl font-bold text-white-800">NPS Score</div>
        <div className="text-lg font-bold text-gray-300">Customer Satisfaction</div>
      </div>
      <div><img src="./../../assets/ic_person.svg" /></div>
    </div> */}

    <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
      <p className="font-bold text-sm">Market Penetration</p>
      <div className="rightColCard flex flex-col items-center">
        <div className="flex mt-6">
          <TrendUp />
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">2.6%</span> than last year
          </p>
        </div>
        <EmptyPieChart data={data} innerRadius={60} outerRadius={80} />
      </div>
    </div>

    <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
      <p className="font-bold text-sm">MRR Stats</p>
      <p className="text-xs text-gray-500">(+43% New | -12% Churnned) than last year</p>
      <div className="rightColCard flex flex-col items-center mt-4">
        <LineComparison />
      </div>
    </div>

    <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
      <p className="font-bold text-sm"> LTV/CAC Comparison</p>
      <div className="rightColCard flex flex-col items-center">
        <PieComparison />
      </div>
    </div>
  </div>
);

export default RightBarCard;
