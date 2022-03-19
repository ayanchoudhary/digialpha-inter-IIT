import React from 'react';
// import { useParams } from 'react-router-dom';
import "./../styles/CompanyData.css"

const CompanyData = (CompanyName) => {
  // Take Company Name from store
  CompanyName = "Apple"
  document.getElementsByClassName('CompanyLogoImg').src = './../assets/' + { CompanyName } + '.jpg';

  return (
    <div className="CompanyData flex flex-row items-start content-start justify-start">
      <div className="CompanyLogo">
        <img className="CompanyLogoImg" />
      </div>
      <div className="CompanyName">{CompanyName}</div>
    </div>
  );
};

export default CompanyData;
