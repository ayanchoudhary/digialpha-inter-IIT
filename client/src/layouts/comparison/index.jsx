import React, { useMemo } from 'react';
import useCompanyDetailsMapper from '@services/useCompanyDetailsMapper';
import { useParams } from 'react-router-dom';
import { useGetComparisonDetails } from '../../edgeServer/getCompanyDetails';
import useStore from '../../store';
import Navbar from '../Navbar';
import MinStatCardComparison from '../companyDashboard/MinStatCardComparison';
import { COMPANY_COLORS } from '@constants/variations';
import { preciseRoundOff, kFormatter } from '@utils/utils';

const Comparison = () => {
  const { companyName1, companyName2 } = useParams();

  useGetComparisonDetails(companyName1, companyName2);

  const company1 = useStore((state) => state.company1);
  const company2 = useStore((state) => state.company2);

  const company1Data = useCompanyDetailsMapper(company1);
  const company2Data = useCompanyDetailsMapper(company2);

  const MinStatCardData = useMemo(
    () => [
      {
        label: 'Total Active Users',
        graphData1: company1Data.users,
        graphData2: company2Data.users,
        val: 'users',
        showTotal: true,
      },
      {
        label: 'New Accounts',
        graphData1: company1Data.accounts,
        graphData2: company2Data.accounts,
        val: 'accounts',
        showTotal: true,
      },
      {
        label: 'Customer Acquisition Cost',
        graphData1: company1Data.cac,
        graphData2: company2Data.cac,
        val: 'cac',
        showTotal: true,
      },
      {
        label: 'Lifetime Value',
        graphData1: company1Data.ltv,
        graphData2: company2Data.ltv,
        val: 'ltv',
        tooltipFormatter: (value) => [`€ ${kFormatter(preciseRoundOff(value))}`],
        showTotal: true,
      },
      {
        label: 'CAC Payback',
        graphData1: company1Data.payback,
        graphData2: company2Data.payback,
        val: 'payback',
        tooltipFormatter: (value) => [`€ ${kFormatter(preciseRoundOff(value))}`],
        showTotal: true,
      },
      {
        label: 'Qualified Leads',
        graphData1: company1Data.leads,
        graphData2: company2Data.leads,
        val: 'leads',
        showTotal: true,
      },
      {
        label: 'Sales Cycle',
        graphData1: company1Data.salesCycle,
        graphData2: company2Data.salesCycle,
        val: 'salesCycle',
        tooltipFormatter: (value) => [`${preciseRoundOff(value)} days`],
      },
      {
        label: 'Average Revenue',
        graphData1: company1Data.arpa,
        graphData2: company2Data.arpa,
        val: 'avgRevenue',
        tooltipFormatter: (value) => [`€ ${kFormatter(preciseRoundOff(value))}`],
      },
      {
        label: 'Conversion Rates',
        graphData1: company1Data.conversion,
        graphData2: company2Data.conversion,
        val: 'conversion',
        tooltipFormatter: (value) => [`${preciseRoundOff(value)}%`],
      },
    ],
    [
      company1Data.accounts,
      company1Data.arpa,
      company1Data.cac,
      company1Data.conversion,
      company1Data.leads,
      company1Data.ltv,
      company1Data.payback,
      company1Data.salesCycle,
      company1Data.users,
      company2Data.accounts,
      company2Data.arpa,
      company2Data.cac,
      company2Data.conversion,
      company2Data.leads,
      company2Data.ltv,
      company2Data.payback,
      company2Data.salesCycle,
      company2Data.users,
    ],
  );

  return (
    <>
      <Navbar />
      <div className="CompanyDashboard px-10 pb-11">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl text-gray-700">
            {companyName1} x {companyName2}
          </h1>
        </div>
        <div className="flex gap-4 justify-center w-full px-10 flex-wrap">
          {MinStatCardData.map((data) => (
            <MinStatCardComparison
              key={data.label}
              label={data.label}
              color1={COMPANY_COLORS.color1}
              color2={COMPANY_COLORS.color2}
              graphData1={data.graphData1}
              graphData2={data.graphData2}
              val={data.val}
              showTotal={data.showTotal}
              tooltipFormatter={
                data.tooltipFormatter
                  ? data.tooltipFormatter
                  : (value) => [`${kFormatter(preciseRoundOff(value))}`]
              }
              legendPayload={[
                {
                  value: companyName1,
                  color: COMPANY_COLORS.color1,
                  type: 'line',
                },
                {
                  value: companyName2,
                  color: COMPANY_COLORS.color2,
                  type: 'line',
                },
              ]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comparison;
