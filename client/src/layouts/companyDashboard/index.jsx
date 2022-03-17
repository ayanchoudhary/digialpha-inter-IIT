import React from 'react';
import { useParams } from 'react-router-dom';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  console.log(companyName);
  return <div>CompanyDashboard</div>;
};

export default CompanyDashboard;
