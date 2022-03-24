import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetComparisonDetails } from '../../edgeServer/getCompanyDetails';
import useStore from '../../store';
import TinyLineComparison from '../charts/TinyLineComparison';
import MinStatCardComparison from '../companyDashboard/MinStatCardComparison';
import TimeFilter from '../companyDashboard/TimeFilter';
import Navbar from '../Navbar';
import {
  getDelta,
  getArrGraphData,
  getCumulativeSum,
  kFormatter,
  preciseRoundOff,
} from './../../utils/utils';

const Comparison = () => {
  const { companyName1 } = useParams();
  const { companyName2 } = useParams();
  useGetComparisonDetails(companyName1, companyName2);
  const showGlobalLoader = useStore((state) => state.showGlobalLoader);

  const company1 = useStore((state) => state.company1);
  const company2 = useStore((state) => state.company2);
  const [au1, setAu1] = useState([]);
  const [au2, setAu2] = useState([]);
  const [na1, setNa1] = useState(0);
  const [na2, setNa2] = useState(0);
  const [cac1, setCac1] = useState(0);
  const [cac2, setCac2] = useState(0);
  const [ltv1, setLtv1] = useState(0);
  const [ltv2, setLtv2] = useState(0);
  const [cacp1, setCacp1] = useState(0);
  const [cacp2, setCacp2] = useState(0);
  const [ql1, setQl1] = useState(0);
  const [ql2, setQl2] = useState(0);

  useEffect(() => {
    console.log(company2);
    console.log(company1);
    if (company1.engagement && company2.engagement) {
      setAu1(getArrGraphData(company1.engagement, 'users', 'users'));
      setAu2(getArrGraphData(company2.engagement, 'users', 'users'));
    }
  }, [company1, company2]);
  // console.log(company1);
  console.log(au1);
  console.log(au2);

  return (
    <>
      <Navbar />
      <div className="CompanyDashboard px-10 pb-11">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl text-gray-700">
            {companyName1} x {companyName2}
          </h1>
          <div className="flex gap-4 items-center">
            <TimeFilter />
          </div>
        </div>
        <div>
          {/* <MinStatCardComparison/> */}
          <TinyLineComparison
            color1="#000000"
            color2="#111111"
            data1={au1}
            data2={au2}
            val="users"
          />
        </div>
      </div>
    </>
  );
};

export default Comparison;
