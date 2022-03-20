import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MinStatCard from '@layouts/companyDashboard/MinStatCard';
import SideBarCard from '@layouts/companyDashboard/SideBarCard';
import '@layouts/companyDashboard/index.scss';
import ChartWrapper from '@layouts/charts/ChartWrapper';
import { CHART_TYPES } from '@constants/variations';
import RightBarCard from './RightBarCard';
import useStore from './../../store';
import { getDelta, getArrGraphData, getCumulativeSum, kFormatter } from './../../utils/utils';
import { maxBy } from 'lodash';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  const company = useStore((state) => state.company);
  const [leadsDelta, setleadsDelta] = useState(0);
  const [leads, setleads] = useState([0]);
  const [arpaDelta, setarpaDelta] = useState(0);
  const [arpa, setarpa] = useState([0]);
  const [salesCycleDelta, setsalesCycleDelta] = useState(0);
  const [salesCycle, setsalesCycle] = useState([0]);
  const [conversion, setconversion] = useState([]);
  const [conversionDelta, setconversionDelta] = useState(0);
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

  const TopPanelData = useMemo(
    () => [
      {
        label: 'Total Active Users',
        value: getCumulativeSum(users, 'users'),
        delta: usersDelta,
        graphType: CHART_TYPES.LINE,
        graphData: users,
        val: 'users',
      },
      {
        label: 'New Accounts',
        value: getCumulativeSum(accounts, 'accounts'),
        delta: accountsDelta,
        graphType: CHART_TYPES.LINE,
        graphData: accounts,
        val: 'accounts',
      },
      {
        label: 'Customer Acquisition Cost',
        value: `€ ${getCumulativeSum(cac, 'cac')}`,
        delta: cacDelta,
        graphType: CHART_TYPES.BAR,
        graphData: cac,
        val: 'cac',
      },
      {
        label: 'Lifetime Value',
        value: `€ ${getCumulativeSum(ltv, 'ltv')}`,
        delta: ltvDelta,
        graphType: CHART_TYPES.BAR,
        graphData: ltv,
        val: 'ltv',
      },
      {
        label: 'CAC Payback',
        value: `€ ${getCumulativeSum(payback, 'payback')}`,
        delta: paybackDelta,
        graphType: CHART_TYPES.LINE,
        graphData: payback,
        val: 'payback',
      },
    ],
    [
      users,
      usersDelta,
      accounts,
      accountsDelta,
      cac,
      cacDelta,
      ltv,
      ltvDelta,
      payback,
      paybackDelta,
    ],
  );

  const LeftPanelData = useMemo(
    () => [
      {
        label: 'Qualified Leads',
        value: getCumulativeSum(leads, 'leads'),
        delta: leadsDelta,
        graphType: CHART_TYPES.LINE,
        graphData: leads,
        bgcolor: '#E4F8EA',
        color: '#005249',
        val: 'leads',
      },
      {
        label: 'Sales Cycle',
        value: `${maxBy(salesCycle, 'salesCycle')?.salesCycle || 0} days`,
        delta: salesCycleDelta,
        graphType: CHART_TYPES.LINE,
        graphData: salesCycle,
        bgcolor: '#FFF7CD',
        color: '#7A4F01',
        val: 'salesCycle',
      },
      {
        label: 'Average Revenue',
        value: `€ ${kFormatter(maxBy(arpa, 'avgRevenue')?.avgRevenue) || 0}`,
        delta: arpaDelta,
        graphType: CHART_TYPES.LINE,
        graphData: arpa,
        bgcolor: '#E2FDFE',
        color: '#005249',
        val: 'avgRevenue',
      },
      {
        label: 'Conversion Rates',
        value: `${maxBy(conversion, 'conversion')?.conversion || 0}%`,
        delta: conversionDelta,
        graphType: CHART_TYPES.LINE,
        graphData: conversion,
        bgcolor: '#C8FACD',
        color: '#005249',
        val: 'conversion',
      },
    ],
    [arpa, arpaDelta, conversion, conversionDelta, leads, leadsDelta, salesCycle, salesCycleDelta],
  );

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
      setconversion(getArrGraphData(company.acquisition, 'conversion', 'conversion'));
      setconversionDelta(getDelta(company.acquisition, 'conversion'));
    }
    if (company.revenue) {
      setarpaDelta(getDelta(company.revenue, 'arpa'));
      setarpa(getArrGraphData(company.revenue, 'arpa', 'avgRevenue'));
      setrrDelta(getDelta(company.revenue, 'rr'));
      setrr(getArrGraphData(company.revenue, 'rr', 'recurringRevenue'));
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
        {TopPanelData.map((stat) => (
          <MinStatCard {...stat} key={stat.label} />
        ))}
      </div>
      <div className="flex flex-row justify-evenly flex-nowrap">
        <div className="Col1 flex-shrink-0">
          {LeftPanelData.map((stat) => (
            <SideBarCard {...stat} key={stat.label} />
          ))}
        </div>
        <div className="Col2 flex-shrink-0">
          <div className="flex flex-col gap-8">
            <ChartWrapper
              chartLabel="Active Users Stats"
              type={CHART_TYPES.LINE}
              data={users}
              val="users"
            />
            <ChartWrapper
              chartLabel="Quarterly Recurring Revenue"
              type={CHART_TYPES.BAR_HZ}
              data={rr}
              val="recurringRevenue"
            />
            <ChartWrapper chartLabel="ARR Growth Rate" type={CHART_TYPES.BAR} />
          </div>
        </div>
        <div className="Col3 flex-shrink-0">
          <RightBarCard />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
