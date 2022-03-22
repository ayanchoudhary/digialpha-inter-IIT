import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import CompanyDashboard from './companyDashboard';
import { useGetCompanyDetailsByName } from '../edgeServer/getCompanyDetails';

const Dashboard = () => {
  const { companyName } = useParams();

  useGetCompanyDetailsByName(companyName);

  return (
    <div className="dashboard flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="mt-8">
        <CompanyDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
