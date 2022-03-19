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

const data1 = [
  { name: 'NPS', value: 8 },
  { name: 'Left', value: 2 },
];

const RightBarCard = ({ label, value, delta, graphType, graphData, bgcolor, color }) => {
  const isDeltaPositive = delta > 0;

  return (
    <div className="flex flex-col">
      <div
        className="nps flex flex-row items-center rounded-3xl flex-shrink-0 h-36 gap-8 m-6"
        style={{ backgroundColor: '#005249', color: 'white' }}
      >
        <div>
          <EmptyPieChart data={data1} innerRadius={20} outerRadius={25} />
        </div>
        <div>
          <div className="text-3xl font-bold text-white-800">NPS Score</div>
          <div className="text-lg font-bold text-gray-300">Customer Satisfaction</div>
        </div>
        <div>
            <img src='./../../assets/ic_person.svg'/>
        </div>
      </div>
      <div className="pie1 flex flex-col gap-8">
        <div>Market Penetration</div>
        <EmptyPieChart fullWidth data={data} innerRadius={60} outerRadius={80} />
      </div>
      <div className="line1 gap-8">
        <div className="">MRR Stats</div>
        <LineComparison />
      </div>
      <div className="pie2 gap-8">
        LTV/CAC Comparison
        <PieComparison fullWidth />
      </div>
    </div>
  );
};

export default RightBarCard;
