import React from 'react';
import { useParams } from 'react-router-dom';
// import { useGetCompanyInfoByName } from '@edgeServer/getCompanyInfo';
// import { useGetAcquisitions } from '@edgeServer/getAcquisitions';
// import { useGetEngagement } from '@edgeServer/getEngagement';
// import { useGetRevenue } from '@edgeServer/getRevenue';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  //   const companyInfoGQL = useGetCompanyInfoByName(companyName);
  //   const acquisitionsGQL = useGetAcquisitions(companyName);
  //   const engagementGQL = useGetEngagement(companyName);
  //   const revenueGQL = useGetRevenue(companyName);

  //   console.log(revenueGQL);
  return <div>CompanyDashboard | {companyName}</div>;
};

export default CompanyDashboard;
