import React from 'react';
import { useParams } from 'react-router-dom';
import CompanyDetails from './CompanyDetails';
import Acquistion from './Acquistion';
import Engagement from './Engagement';
import Revenue from './Revenue';
import UnitEcon from './UnitEcon';
import './Dashboard.css';
import Navbar from '../Navbar';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  console.log(companyName);
  return (
    <div className="CompanyDashboard">
      <Navbar />
      <div>{companyName}</div>
      <div className="CompanyData">
        <div className="CompanyDetails">
          <CompanyDetails />
        </div>
        <div className="Acquisition">
          <Acquistion />
        </div>
        <div className="Engagement">
          <Engagement />
        </div>
        <div className="Revenue">
          <Revenue />
        </div>
        <div className="UnitEcon">
          <UnitEcon />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
