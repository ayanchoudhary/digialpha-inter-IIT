/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getDelta, getArrGraphData } from '../utils/utils';

const useCompanyDetailsMapper = (company) => {
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
  const [growthDelta, setgrowthDelta] = useState(0);
  const [growth, setgrowth] = useState([0]);

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

  return {
    leadsDelta,
    leads,
    arpaDelta,
    arpa,
    salesCycleDelta,
    salesCycle,
    conversion,
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
  };
};

export default useCompanyDetailsMapper;
