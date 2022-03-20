import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MinStatCard from '@layouts/companyDashboard/MinStatCard';
import SideBarCard from '@layouts/companyDashboard/SideBarCard';
import '@layouts/companyDashboard/index.scss';
import ChartWrapper from '@layouts/charts/ChartWrapper';
import { CHART_TYPES } from '@constants/variations';
import RightBarCard from './RightBarCard';
import useStore from './../../store';
import { getDelta, getArrGraphData } from './../../utils/utils';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  const company = useStore((state) => state.company);
  const [leadsDelta, setleadsDelta] = useState(0);
  const [leads, setleads] = useState([0]);
  const [arpaDelta, setarpaDelta] = useState(0);
  const [arpa, setarpa] = useState([0]);
  const [salesCycleDelta, setsalesCycleDelta] = useState(0);
  const [salesCycle, setsalesCycle] = useState([0]);
  const [accountDist, setaccountDist] = useState([0]);
  const [ltvDelta, setltvDelta] = useState(0);
  const [ltv, setltv] = useState([0]);
  const [cacDelta, setcacDelta] = useState(0);
  const [cac, setcac] = useState([0]);
  const [usersDelta, setusersDelta] = useState(0);
  const [users, setusers] = useState([0]);
  const [accountsDelta, setaccountsDelta] = useState(0);
  const [accounts, setaccounts] = useState([0]);
  const [paybackDelta, setpaybackDelta] = useState(0);
  const [payback, setpayback] = useState([0]);
  const [rrDelta, setrrDelta] = useState(0);
  const [rr, setrr] = useState([0]);
  const [growthDelta, setgrowthDelta] = useState(0);
  const [growth, setgrowth] = useState([0]);

  const DUMMY_MINISTAT_DATA = [
    {
      label: 'Total Active Users',
      value: users[users.length-1],
      delta: usersDelta,
      graphType: 'line',
      graphData: users,
      val: 'users',
    },
    { label: 'New Accounts', value: accounts[accounts.length-1], delta: accountsDelta, graphType: 'line', graphData: accounts, val: 'accounts' },
    {
      label: 'Customer Acquisition Cost',
      value: cac[cac.length-1],
      delta: cacDelta,
      graphType: 'bar',
      graphData: cac,
      val: 'cac',
    },
    {
      label: 'Lifetime Value',
      value: ltv[ltv.length - 1],
      delta: ltvDelta,
      graphType: 'bar',
      graphData: ltv,
      val: 'ltv',
    },
    { label: 'CAC Payback', value: payback[payback.length-1], delta: paybackDelta, graphType: 'line', graphData: payback, val: 'payback' },
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
      value: arpa[arpa.length - 1],
      delta: arpaDelta,
      graphType: 'line',
      graphData: arpa,
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
      setaccountsDelta(getDelta(company.acquisition, 'accounts'));
      setaccounts(getArrGraphData(company.acquisition, 'accounts', 'accounts'));
    }
    if (company.revenue) {
      setaccountDist(getArrGraphData(company.revenue, 'accountDist', 'accountDist'));
      setarpaDelta(getDelta(company.revenue, 'arpa'));
      setarpa(getArrGraphData(company.revenue, 'arpa', 'avgRevenue'));
      setrrDelta(getDelta(company.revenue, 'rr'));
      setrr(getArrGraphData(company.revenue, 'rr', 'recurringRevenue'));
      setgrowthDelta(getDelta(company.revenue, 'growth'));
      setgrowth(getArrGraphData(company.revenue, 'growth', 'growth'));
    }
    if (company.unitEcon) {
      setltvDelta(getDelta(company.unitEcon, 'ltv'));
      setltv(getArrGraphData(company.unitEcon, 'ltv', 'ltv'));
      setpaybackDelta(getDelta(company.unitEcon, 'payback'));
      setpayback(getArrGraphData(company.unitEcon, 'payback', 'payback'));
    }
    if (company.engagement) {
      setusersDelta(getDelta(company.engagement, 'users'));
      setusers(getArrGraphData(company.engagement, 'users', 'users'));
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
            <ChartWrapper chartLabel="Active Users Stats" type={CHART_TYPES.LINE} data={users} val='users' delta={usersDelta}/>
            <ChartWrapper chartLabel="Quarterly Recurring Revenue" type={CHART_TYPES.BAR_HZ} data={rr} val='recurringRevenue' delta={rrDelta} />
            <ChartWrapper chartLabel="ARR Growth Rate" type={CHART_TYPES.BAR} data={growth} val='growth' delta={growthDelta}/>
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
