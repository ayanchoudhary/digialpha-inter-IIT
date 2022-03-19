import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import CompanyDashboard from './companyDashboard';
import { useGetCompanyDetailsByName } from '../edgeServer/getCompanyDetails';
import useStore from '../store';

const Dashboard = () => {
  const { companyName } = useParams();
  console.log(companyName);

  const { data, loading, error } = useGetCompanyDetailsByName(companyName);
  const company = useStore((state) => state.company);

  useEffect(() => {
    console.log(company);
  }, [company]);

  return (
    <div className="dashboard flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <CompanyDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
