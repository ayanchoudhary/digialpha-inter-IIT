/* eslint-disable react/prop-types */
import React from 'react';
import { TrendUp, TrendDown } from '@assets/icons';
import EmptyPieChart from '../charts/EmptyPieChart';
import PieComparison from '../charts/PieComparison';
import useStore from './../../store';
import { useState, useEffect } from 'react';
import { getArrGraphData, getDelta } from './../../utils/utils';
import { useMemo } from 'react';
import { getCumulativeSum, preciseRoundOff } from '@utils/utils';
import TinyLineChart from '@layouts/charts/TinyLineChart';
import { Person } from './../../assets/icons';
import { last } from 'lodash';

const RightBarCard = () => {
  const company = useStore((state) => state.company);
  const [penetrationDelta, setpenetrationDelta] = useState(0);
  const [penetration, setpenetration] = useState([0]);
  const [rrDelta, setrrDelta] = useState(0);
  const [rr, setrr] = useState([0]);
  const [churnRateDelta, setchurnRateDelta] = useState(0);
  const [churnRate, setchurnRate] = useState([0]);
  const [cac, setcac] = useState([0]);
  const [ltv, setltv] = useState([0]);
  let [nps, setnps] = useState([0]);

  useEffect(() => {
    if (company.acquisition) {
      setcac(getArrGraphData(company.acquisition, 'cac', 'cac'));
    }
    if (company.unitEcon) {
      setltv(getArrGraphData(company.unitEcon, 'ltv', 'ltv'));
    }
    if (company.engagement) {
      setpenetration(getArrGraphData(company.engagement, 'penetration', 'penetration'));
      setpenetrationDelta(getDelta(company.engagement, 'penetration'));
      setnps(getArrGraphData(company.engagement, 'nps', 'nps'));
    }
    if (company.revenue) {
      setrrDelta(getDelta(company.revenue, 'rr'));
      setrr(getArrGraphData(company.revenue, 'rr', 'mrr'));
      setchurnRateDelta(getDelta(company.revenue, 'churnRate'));
      setchurnRate(getArrGraphData(company.revenue, 'churnRate', 'churnRate'));
    }
  }, [company]);

  const penetrationData = useMemo(() => {
    const sum = String(last(penetration)['penetration']).substring(0, 5) - '0';
    return [
      { value: sum, label: 'Total Penetration' },
      { value: 100 - sum, label: 'Total Market' },
    ];
  }, [penetration]);

  const npsValue = useMemo(() => {
    let sum = last(nps)['nps'] - '0';
    return [{ value: sum, label: 'NPS Score' }, { value: 100 - Math.abs(sum) }];
  }, [nps]);

  const mrrAndChurnRateData = useMemo(
    () => rr.map((a, i) => ({ ...a, churnRate: churnRate[i]?.churnRate })),
    [rr, churnRate],
  );

  const cumulativeCac = useMemo(() => getCumulativeSum(cac, 'cac', false), [cac]);
  const cumulativeLtv = useMemo(() => getCumulativeSum(ltv, 'ltv', false), [ltv]);
  const ltvCacRatio = useMemo(
    () => (cumulativeCac ? cumulativeLtv / cumulativeCac : 0).toPrecision(2),
    [cumulativeCac, cumulativeLtv],
  );

  return (
    <div className="flex flex-col">
      <div
        className="nps flex flex-row items-center rounded-xl p-2"
        style={{ backgroundColor: '#005249' }}
      >
        <div className="h-20">
          <EmptyPieChart
            height={80}
            width={80}
            data={npsValue}
            innerRadius={30}
            outerRadius={35}
            per={false}
          />
        </div>
        <div className="flex flex-col fontClass font-bold ml-2">
          <div className="text-white text-2xl">NPS Score</div>
          <div className="text-gray-300 text-sm">Customer Satisfaction</div>
        </div>
        <div>
          <Person />
        </div>
      </div>
      <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
        <p className="font-bold text-sm">Market Penetration</p>
        <div className="width-250 flex flex-col items-center">
          <div className="flex mt-6 items-center">
            {penetrationDelta > 0 ? <TrendUp /> : <TrendDown />}
            <p className="text-sm text-gray-500 ml-2 m-0">
              <span className="font-bold text-gray-900">{preciseRoundOff(penetrationDelta)}%</span>{' '}
              than last year
            </p>
          </div>
          <EmptyPieChart data={penetrationData} innerRadius={60} outerRadius={80} per={true} />
        </div>
      </div>

      <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
        <p className="font-bold text-sm">MRR Stats</p>
        <p className="text-xs text-gray-500">
          ({preciseRoundOff(rrDelta)}% New | {preciseRoundOff(churnRateDelta)}% Churnned) <br />{' '}
          than last year
        </p>
        <div className="width-250 flex flex-col items-center mt-4 h-52">
          <TinyLineChart
            fullWidth
            graphData={mrrAndChurnRateData}
            val="mrr"
            labelFormatter={(a, b) =>
              `${preciseRoundOff(b[0]?.value)} (${b[0]?.payload?.date || ''})`
            }
            formatter={(a, b, c) => [`${preciseRoundOff(c?.payload?.churnRate)}%`, 'Churn Rate']}
          />
        </div>
      </div>

      <div className="p-6 my-6 rounded-md soft-box-shadow flex flex-col justify-between soft-box-shadow">
        <p className="font-bold text-sm">LTV/CAC Comparison</p>
        <div className="width-250 flex flex-col items-center">
          <PieComparison
            val1={[
              { name: 'CAC', value: cumulativeCac },
              { name: 'Left', value: cumulativeLtv + cumulativeCac },
            ]}
            val2={[
              { name: 'LTV', value: cumulativeLtv },
              { name: 'Left', value: cumulativeLtv + cumulativeCac },
            ]}
            label={`${String(ltvCacRatio * 100).substring(0, 5) - '0'}%`}
            legendPayload={[
              { value: `Total LTV: ${preciseRoundOff(cumulativeLtv)}`, color: '#007B55' },
              { value: `Total CAC: ${preciseRoundOff(cumulativeCac)}`, color: '#B78103' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RightBarCard;
