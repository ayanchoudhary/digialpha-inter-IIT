import React from 'react';
import { useParams } from 'react-router-dom';
import CompanyDetails from './CompanyDetails';
import Acquistion from './Acquistion';
import Engagement from './Engagement';
import Revenue from './Revenue';
import UnitEcon from './UnitEcon';
import './../../styles/CompanyDashboard.css';

const CompanyDashboard = () => {
  const { companyName } = useParams();
  console.log(companyName);
  return (
    <div className="CompanyDashboard flex flex-col items-center">
      <div className="Row1">Row1</div>
      <div className="Row2 flex flex-row justify-between">
        <div className="Col1">Col1</div>
        <div className="Col2">Col2</div>
        <div className="Col3">Col3</div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
