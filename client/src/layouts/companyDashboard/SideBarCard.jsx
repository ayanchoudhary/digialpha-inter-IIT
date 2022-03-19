/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import TinyLineChart from '@layouts/charts/TinyLineChart';
import TinyPieChart from '@layouts/charts/TinyPieChart';

const SideBarCard = ({ label, value, delta, graphType, graphData, bgcolor, color }) => {
  const isDeltaPositive = delta > 0;

  return (
    <div
      className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow"
      style={{ backgroundColor: `${bgcolor}`, color: `${color}` }}
    >
      <div className="flex justify-between">
        <div className="mr-6">
          <p className="text-sm font-bold mb-0">{label}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
        </div>
        {delta && (
          <div>
            <div className="text-sm flex items-center mb-1">
              {isDeltaPositive ? <TrendUp /> : <TrendDown />}{' '}
              <span className="font-bold ml-2">{delta}%&nbsp;</span>
            </div>
            <p className="text-sm">than last year</p>
          </div>
        )}
      </div>
      <div style={{ height: 200 }}>
        {graphType === 'line' ? (
          <TinyLineChart stroke={color} fullWidth graphData={graphData} />
        ) : (
          <TinyPieChart fullWidth graphData={graphData} />
        )}
      </div>
    </div>
  );
};

export default SideBarCard;
