/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import LineComparison from '../charts/LineComparison';
import EmptyPieChart from '../charts/EmptyPieChart';
import PieComparison from '../charts/PieComparison';
import useStore from './../../store';
import { useState, useEffect } from 'react';
import { getArrGraphData, getDelta } from './../../utils/utils';
import { useMemo } from 'react';
import { getCumulativeSum } from '@utils/utils';

const RightBarCard = () => {
  const company = useStore((state) => state.company);
  const [penetrationDelta, setpenetrationDelta] = useState(0);
  const [penetration, setpenetration] = useState([0]);
  const [rrDelta, setrrDelta] = useState(0);
  const [rr, setrr] = useState([0]);
  const [churnRateDelta, setchurnRateDelta] = useState(0);
  const [churnRate, setchurnRate] = useState([0]);

  useEffect(() => {
    if (company.engagement) {
      setpenetration(getArrGraphData(company.engagement, 'penetration', 'penetration'));
      setpenetrationDelta(getDelta(company.engagement, 'penetration'));
    }
    if (company.revenue) {
      setrrDelta(getDelta(company.revenue, 'rr'));
      setrr(getArrGraphData(company.revenue, 'rr', 'MRR'));
      setchurnRateDelta(getDelta(company.revenue, 'churnRate'));
      setchurnRate(getArrGraphData(company.revenue, 'churnRate', 'churnRate'));
    }
  }, [company]);

  const penetrationData = useMemo(
    () => getCumulativeSum(penetration, 'penetration'),
    [penetration],
  );

  console.log('penetrationData', penetrationData);

  return (
    <div className="flex flex-col">
      <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
        <p className="font-bold text-sm">Market Penetration</p>
        <div className="width-250 flex flex-col items-center">
          <div className="flex mt-6 items-center">
            {penetrationDelta > 0 ? <TrendUp /> : <TrendDown />}
            <p className="text-sm text-gray-500 ml-2 m-0">
              <span className="font-bold text-gray-900">{penetrationDelta}%</span> than last year
            </p>
          </div>
          <EmptyPieChart data={penetration} innerRadius={60} outerRadius={80} val="penetration" />
        </div>
      </div>

      <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
        <p className="font-bold text-sm">MRR Stats</p>
        <p className="text-xs text-gray-500">
          ({rrDelta}% New | {churnRateDelta}% Churnned) than last year
        </p>
        <div className="width-250 flex flex-col items-center mt-4">
          <LineComparison data1={rr} data2={churnRate} val1="MRR" val2="churnRate" />
        </div>
      </div>

      <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
        <p className="font-bold text-sm"> LTV/CAC Comparison</p>
        <div className="width-250 flex flex-col items-center">
          <PieComparison />
        </div>
      </div>
    </div>
  );
};

export default RightBarCard;
