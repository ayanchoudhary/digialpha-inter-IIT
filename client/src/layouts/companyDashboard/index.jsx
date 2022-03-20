import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MinStatCard from '@layouts/companyDashboard/MinStatCard';
import SideBarCard from '@layouts/companyDashboard/SideBarCard';
import '@layouts/companyDashboard/index.scss';
import ChartWrapper from '@layouts/charts/ChartWrapper';
import { CHART_TYPES } from '@constants/variations';
import LineComparison from '../charts/LineComparison';
import RightBarCard from './RightBarCard';
import useStore from './../../store';
import { getDelta, getArrGraphData } from './../../utils/utils';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  const company = useStore((state) => state.company);
  const [leadsDelta, setleadsDelta] = useState(0);
  const [leads, setleads] = useState([0]);
  const [rrDelta, setrrDelta] = useState(0);
  const [rr, setrr] = useState([0]);
  const [salesCycleDelta, setsalesCycleDelta] = useState(0);
  const [salesCycle, setsalesCycle] = useState([0]);
  const [accountDist, setaccountDist] = useState([0]);
  const [ltvDelta, setltvDelta] = useState(0);
  const [ltv, setltv] = useState([0]);
  const [cacDelta, setcacDelta] = useState(0);
  const [cac, setcac] = useState([0]);

  const DUMMY_MINISTAT_DATA = [
    {
      label: 'Total Active Users',
      value: '18,765',
      delta: '2.6',
      graphType: 'line',
      graphData: [],
    },
    { label: 'New Accounts', value: '18,765', delta: '-0.6', graphType: 'line', graphData: [] },
    {
      label: 'Customer Acquisition Cost',
      value: cac[cac.length-1],
      delta: cacDelta,
      graphType: 'bar',
      graphData: cac,
    },
    {
      label: 'Lifetime Value',
      value: ltv[ltv.length - 1],
      delta: ltvDelta,
      graphType: 'bar',
      graphData: ltv,
    },
    { label: 'CAC Payback', value: '18,765', delta: '2.6', graphType: 'line', graphData: [] },
  ];

  const DUMMY_MINISTAT_DATA2 = [
    {
      label: 'Qualified Leads',
      value: leads[leads.length - 1],
      delta: leadsDelta,
      graphType: 'line',
      graphData: leads,
      bgcolor: '#C8FACD',
      color: '#005249',
      val: 'leads',
    },
    {
      label: 'Sales Cycle',
      value: salesCycle[salesCycle.length - 1],
      delta: salesCycleDelta,
      graphType: 'line',
      graphData: salesCycle,
      bgcolor: '#FFF7CD',
      color: '#7A4F01',
      val: 'salesCycle',
    },
    {
      label: 'Average Revenue',
      value: rr[rr.length - 1],
      delta: rrDelta,
      graphType: 'line',
      graphData: rr,
      bgcolor: '#C8FACD',
      color: '#005249',
      val: 'avgRevenue',
    },
    {
      label: 'Distribution of accounts',
      graphType: 'pie',
      graphData: accountDist,
      val: 'accountDist',
    },
  ];

  useEffect(() => {
    if (company.acquisition) {
      setleadsDelta(getDelta(company.acquisition, 'leads'));
      setleads(getArrGraphData(company.acquisition, 'leads', 'leads'));
      setsalesCycleDelta(getDelta(company.acquisition, 'salesCycle'));
      setsalesCycle(getArrGraphData(company.acquisition, 'salesCycle', 'salesCycle'));
      setcacDelta(getDelta(company.acquisition, 'cac'));
      setcac(getArrGraphData(company.acquisition, 'cac', 'cac'));
    }
    if (company.revenue) {
      setaccountDist(getArrGraphData(company.revenue, 'accountDist', 'accountDist'));
      setrrDelta(getDelta(company.revenue, 'rr'));
      setrr(getArrGraphData(company.revenue, 'rr', 'avgRevenue'));
    }
    if (company.unitEcon) {
      setltvDelta(getDelta(company.unitEcon, 'ltv'));
      setltv(getArrGraphData(company.unitEcon, 'ltv', 'ltv'));
    }
  }, [company]);

  return (
    <div className="CompanyDashboard px-10 pb-11">
      <div className="mb-4 flex justify-between">
        <h1 className="font-bold text-3xl text-gray-700">{companyName}</h1>
      </div>
      <div className="flex -mx-10 px-10 hide-scrollbar flex-nowrap overflow-x-auto">
        {DUMMY_MINISTAT_DATA.map((stat) => (
          <MinStatCard {...stat} key={stat.label} />
        ))}
      </div>
      <div className="flex flex-row justify-evenly flex-nowrap">
        <div className="Col1 flex-shrink-0">
          {DUMMY_MINISTAT_DATA2.map((stat) => (
            <SideBarCard {...stat} key={stat.label} />
          ))}
        </div>
        <div className="Col2 flex-shrink-0">
          <div className="flex flex-col gap-8">
            <ChartWrapper chartLabel="Active Users Stats" type={CHART_TYPES.LINE} />
            <ChartWrapper chartLabel="Quarterly Recurring Revenue" type={CHART_TYPES.BAR_HZ} />
            <ChartWrapper chartLabel="ARR Growth Rate" type={CHART_TYPES.BAR} />
          </div>
        </div>
        <div className="Col3 flex-shrink-0">
          <RightBarCard></RightBarCard>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
