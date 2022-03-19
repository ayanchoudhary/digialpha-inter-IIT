import React from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from './Navbar';
import CompanyDashboard from './companyDashboard';

const Dashboard = () => {
  const { companyName } = useParams();
  console.log(companyName);

  return (
    <div className="dashboard flex flex-col">
      {/* <div>
        <Navbar />
      </div> */}
      <div className="mt-8">
        <CompanyDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
