import React from 'react';
import { useParams } from 'react-router-dom';
import MinStatCard from '@layouts/companyDashboard/MinStatCard';
import '@layouts/companyDashboard/index.scss';
import ChartWrapper from '@layouts/charts/ChartWrapper';

const DUMMY_MINISTAT_DATA = [
  { label: 'Total Active Users', value: '18,765', delta: '2.6', graphType: 'line', graphData: [] },
  { label: 'New Accounts', value: '18,765', delta: '-0.6', graphType: 'line', graphData: [] },
  {
    label: 'Customer Acquisition Cost',
    value: '18,765',
    delta: '2.6',
    graphType: 'bar',
    graphData: [],
  },
  { label: 'Lifetime Value', value: '18,765', delta: '-2.6', graphType: 'bar', graphData: [] },
  { label: 'CAC Payback', value: '18,765', delta: '2.6', graphType: 'line', graphData: [] },
];

const CompanyDashboard = () => {
  const { companyName } = useParams();
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
      <div>
        <ChartWrapper chartLabel="Active Users Stats" />
      </div>
    </div>
  );
};

export default CompanyDashboard;
