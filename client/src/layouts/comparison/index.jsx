import React, { useMemo, useState, useEffect } from 'react';
import useCompanyDetailsMapper from '@services/useCompanyDetailsMapper';
import { useParams } from 'react-router-dom';
import { useGetComparisonDetails } from '../../edgeServer/getCompanyDetails';
import useStore from '../../store';
import Navbar from '../Navbar';
import MinStatCardComparison from '../companyDashboard/MinStatCardComparison';
import { COMPANY_COLORS } from '@constants/variations';
import { preciseRoundOff, kFormatter } from '@utils/utils';
import { getArrGraphData, getDelta } from './../../utils/utils';
import last from 'lodash';
import DataCard from './DataComp';
import TickerCardComp from './TickerComp';
import TimeFilter from '../companyDashboard/TimeFilter';

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
  const [penetration1, setpenetration1] = useState([0]);
  let [nps1, setnps1] = useState([0]);
  const [penetration2, setpenetration2] = useState([0]);
  let [nps2, setnps2] = useState([0]);

  useEffect(() => {
    if (company1.engagement) {
      setpenetration1(getArrGraphData(company1.engagement, 'penetration', 'penetration'));
      setnps1(getArrGraphData(company1.engagement, 'nps', 'nps'));
    }
    if (company2.engagement) {
      setpenetration2(getArrGraphData(company2.engagement, 'penetration', 'penetration'));
      setnps2(getArrGraphData(company2.engagement, 'nps', 'nps'));
    }
  }, [company1, company2]);
  // console.log(penetration1);
  // console.log((penetration1[penetration1.length -1]['penetration']));

  const penetrationData1 = useMemo(() => {
    return String(penetration1[penetration1.length - 1]['penetration']).substring(0, 5);
  }, [penetration1]);

  // console.log(penetrationData1);
  const npsValue1 = useMemo(() => {
    return nps1[nps1.length - 1]['nps'] - '0';
  }, [nps1]);

  const penetrationData2 = useMemo(() => {
    return String(penetration2[penetration2.length - 1]['penetration']).substring(0, 5);
  }, [penetration2]);

  // console.log(penetrationData1);
  const npsValue2 = useMemo(() => {
    return nps2[nps2.length - 1]['nps'] - '0';
  }, [nps2]);

  const { saasGoals1 } = useStore((state) => state.company1);
  const { sentiment1 } = useStore((state) => state.company1);
  const lastSaasGoalStatus1 = last(saasGoals1);
  const lastSentiment1 = last(sentiment1);

  const { growth1, profitability1, maturity1, retention1 } = lastSaasGoalStatus1;

  const { saasGoals2 } = useStore((state) => state.company2);
  const { sentiment2 } = useStore((state) => state.company2);
  const lastSaasGoalStatus2 = last(saasGoals2);
  const lastSentiment2 = last(sentiment2);

  const { growth2, profitability2, maturity2, retention2 } = lastSaasGoalStatus2;

  const TickerCardData = useMemo(
    () => [
      {
        label: 'Growth',
        value1: growth1,
        value2: growth2,
      },
      {
        label: 'Profitabilty',
        value1: profitability1,
        value2: profitability2,
      },
      {
        label: 'Maturity',
        value1: maturity1,
        value2: maturity2,
      },
      {
        label: 'Retention',
        value1: retention1,
        value2: retention2,
      },
      {
        label: 'Sentiment',
        value1: sentiment1,
        value2: sentiment2,
      },
    ],
    [sentiment1, sentiment2, saasGoals1, saasGoals2],
  );

  return (
    <>
      <Navbar />
      <div className="CompanyDashboard px-10 pb-11">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl text-gray-700">
            {companyName1} x {companyName2}
          </h1>
          <TimeFilter/>
        </div>
        <div className='flex flex-column w-full justify-between'>
          {TickerCardData.map((data) => (
            <TickerCardComp
              key={data.label}
              label={data.label}
              C1={companyName1}
              C2={companyName2}
              value1={data.value1}
              value2={data.value2}
              color1={COMPANY_COLORS.color1}
              color2={COMPANY_COLORS.color2}
            />
          ))}
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
        <div className="flex flex-row justify-center">
          <DataCard
            label="Market Penetration"
            C1={companyName1}
            C2={companyName2}
            value1={penetrationData1}
            value2={penetrationData2}
            color1={COMPANY_COLORS.color1}
            color2={COMPANY_COLORS.color2}
          />
          <DataCard
            label="NPS Value"
            C1={companyName1}
            C2={companyName2}
            value1={npsValue1}
            value2={npsValue2}
            color1={COMPANY_COLORS.color1}
            color2={COMPANY_COLORS.color2}
          />
        </div>
      </div>
    </>
  );
};

export default Comparison;
