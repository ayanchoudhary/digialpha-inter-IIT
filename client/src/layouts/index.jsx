import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from './Navbar';
import CompanyDashboard from './companyDashboard';
import { useGetCompanyDetailsByName } from '../edgeServer/getCompanyDetails';
import useStore from '../store';
import Ticker from './Ticker';

const Dashboard = () => {
  const { companyName } = useParams();

  const { data, loading, error } = useGetCompanyDetailsByName(companyName);
  // const company = useStore((state) => state.company);

  // useEffect(() => {
  //   console.log(company);
  // }, [company]);

  return (
    <div className="dashboard flex flex-col">
      {/* <div>
        <Navbar />
      </div> */}
      {/* <div>
        <Ticker />
      </div> */}
      <div className="mt-8">
        <CompanyDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
