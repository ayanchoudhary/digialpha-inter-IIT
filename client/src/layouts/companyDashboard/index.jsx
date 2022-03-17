import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCompanyInfoByName } from '@edgeServer/getCompanyInfo';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  const { data, error } = useGetCompanyInfoByName(companyName);
  console.log(data, error);
  return <div>CompanyDashboard</div>;
};

export default CompanyDashboard;
