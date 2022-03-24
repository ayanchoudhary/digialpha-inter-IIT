import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MinStatCard from '@layouts/companyDashboard/MinStatCard';
import SideBarCard from '@layouts/companyDashboard/SideBarCard';
import '@layouts/companyDashboard/index.scss';
import ChartWrapper from '@layouts/charts/ChartWrapper';
import { CHART_TYPES } from '@constants/variations';
import RightBarCard from './RightBarCard';
import useStore from './../../store';
import { getCumulativeSum, kFormatter, preciseRoundOff } from './../../utils/utils';
import { maxBy } from 'lodash';
import Ticker from '../Ticker';
import GlobalLoader from '../loaders/GlobalLoader';
import { COMPANY_DATA_CSV_PATH } from '@constants/config';
import TimeFilter from './TimeFilter';
import useCompanyDetailsMapper from '../../services/useCompanyDetailsMapper';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  const company = useStore((state) => state.company);
  const showGlobalLoader = useStore((state) => state.showGlobalLoader);

  const {
    conversion,
    leadsDelta,
    leads,
    arpaDelta,
    arpa,
    salesCycleDelta,
    salesCycle,
    conversionDelta,
    ltvDelta,
    ltv,
    cacDelta,
    cac,
    usersDelta,
    users,
    accountsDelta,
    accounts,
    paybackDelta,
    payback,
    rrDelta,
    rr,
    growthDelta,
    growth,
  } = useCompanyDetailsMapper(company);

  const TopPanelData = useMemo(
    () => [
      {
        label: 'Total Active Users',
        value: preciseRoundOff(getCumulativeSum(users, 'users')),
        delta: preciseRoundOff(usersDelta),
        graphType: CHART_TYPES.LINE,
        graphData: users,
        val: 'users',
      },
      {
        label: 'New Accounts',
        value: preciseRoundOff(getCumulativeSum(accounts, 'accounts')),
        delta: preciseRoundOff(accountsDelta),
        graphType: CHART_TYPES.LINE,
        graphData: accounts,
        val: 'accounts',
      },
      {
        label: 'Customer Acquisition Cost',
        value: `€ ${preciseRoundOff(getCumulativeSum(cac, 'cac'))}`,
        delta: preciseRoundOff(cacDelta),
        graphType: CHART_TYPES.BAR,
        graphData: cac,
        val: 'cac',
      },
      {
        label: 'Lifetime Value',
        value: `€ ${preciseRoundOff(getCumulativeSum(ltv, 'ltv'))}`,
        delta: preciseRoundOff(ltvDelta),
        graphType: CHART_TYPES.BAR,
        graphData: ltv,
        val: 'ltv',
      },
      {
        label: 'CAC Payback',
        value: `€ ${preciseRoundOff(getCumulativeSum(payback, 'payback'))}`,
        delta: preciseRoundOff(paybackDelta),
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
        value: preciseRoundOff(getCumulativeSum(leads, 'leads')),
        delta: preciseRoundOff(leadsDelta),
        graphType: CHART_TYPES.LINE,
        graphData: leads,
        bgcolor: '#E4F8EA',
        color: '#005249',
        val: 'leads',
      },
      {
        label: 'Sales Cycle',
        value: `${preciseRoundOff(maxBy(salesCycle, 'salesCycle')?.salesCycle || 0)} days`,
        delta: preciseRoundOff(salesCycleDelta),
        graphType: CHART_TYPES.LINE,
        graphData: salesCycle,
        bgcolor: '#FFF7CD',
        color: '#7A4F01',
        val: 'salesCycle',
      },
      {
        label: 'Average Revenue',
        value: `€ ${preciseRoundOff(kFormatter(maxBy(arpa, 'avgRevenue')?.avgRevenue) || 0)}`,
        delta: preciseRoundOff(arpaDelta),
        graphType: CHART_TYPES.LINE,
        graphData: arpa,
        bgcolor: '#E2FDFE',
        color: '#005249',
        val: 'avgRevenue',
      },
      {
        label: 'Conversion Rates',
        value: `${preciseRoundOff(maxBy(conversion, 'conversion')?.conversion || 0)}%`,
        delta: preciseRoundOff(conversionDelta),
        graphType: CHART_TYPES.LINE,
        graphData: conversion,
        bgcolor: '#C8FACD',
        color: '#005249',
        val: 'conversion',
      },
    ],
    [arpa, arpaDelta, conversion, conversionDelta, leads, leadsDelta, salesCycle, salesCycleDelta],
  );

  const handleDownloadCSV = () => {
    if (!company.id) return;
    window.open(`${COMPANY_DATA_CSV_PATH}${company.id}`);
  };

  if (showGlobalLoader) return <GlobalLoader />;

  return (
    <div className="CompanyDashboard px-10 pb-11">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="font-bold text-3xl text-gray-700">{companyName}</h1>
        <div className="flex gap-4 items-center">
          <TimeFilter />
          <div
            className="px-3 py-1.5 bg-green-700 text-white text-base font-semibold rounded-md cursor-pointer hover:bg-green-800"
            onClick={handleDownloadCSV}
          >
            Export as CSV
          </div>
        </div>
      </div>
      <div className="flex -mx-10 px-10 hide-scrollbar flex-nowrap overflow-x-auto">
        <Ticker />
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
              delta={preciseRoundOff(usersDelta)}
            />
            <ChartWrapper
              chartLabel="Quarterly Recurring Revenue"
              type={CHART_TYPES.BAR_HZ}
              data={rr}
              val="recurringRevenue"
              delta={preciseRoundOff(rrDelta)}
            />
            <ChartWrapper
              chartLabel="ARR Growth Rate"
              type={CHART_TYPES.BAR}
              data={growth}
              val="growth"
              delta={preciseRoundOff(growthDelta)}
            />
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
