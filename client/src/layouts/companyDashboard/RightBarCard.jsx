/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import TinyLineChart from '@layouts/charts/TinyLineChart';
import TinyPieChart from '@layouts/charts/TinyPieChart';
import LineComparison from '../charts/LineComparison';
import EmptyPieChart from '../charts/EmptyPieChart';
import PieComparison from '../charts/PieComparison';

const RightBarCard = ({ label, value, delta, graphType, graphData, bgcolor, color }) => {
  const isDeltaPositive = delta > 0;

  return (
    <div className="flex flex-col">
      <div className="nps">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="pie1 flex flex-col">
        <div>Market Penetration</div>

        <EmptyPieChart fullWidth/>
      </div>
      <div className="line1">
        <div className="">MRR Stats</div>
        <LineComparison />
      </div>
      <div className="pie2">
        LTV/CAC Comparison
        <PieComparison fullWidth />
      </div>
    </div>
  );
};

export default RightBarCard;
