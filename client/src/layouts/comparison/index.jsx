import React from 'react';
import useCompanyDetailsMapper from '@services/useCompanyDetailsMapper';
import { useParams } from 'react-router-dom';
import { useGetComparisonDetails } from '../../edgeServer/getCompanyDetails';
import useStore from '../../store';
import Navbar from '../Navbar';
import MinStatCardComparison from '../companyDashboard/MinStatCardComparison';

const Comparison = () => {
  const { companyName1, companyName2 } = useParams();

  useGetComparisonDetails(companyName1, companyName2);

  const company1 = useStore((state) => state.company1);
  const company2 = useStore((state) => state.company2);

  const company1Data = useCompanyDetailsMapper(company1);
  const company2Data = useCompanyDetailsMapper(company2);

  return (
    <>
      <Navbar />
      <div className="CompanyDashboard px-10 pb-11">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl text-gray-700">
            {companyName1} x {companyName2}
          </h1>
        </div>
        <div>
          <MinStatCardComparison
            label="ABC"
            color1="#121212"
            color2="#181100"
            graphData1={company1Data.users}
            graphData2={company2Data.users}
            val="users"
          />
          {/* <TinyLineComparison
            color1="#000000"
            color2="#111111"
            data1={au1}
            data2={au2}
            val="users"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Comparison;
