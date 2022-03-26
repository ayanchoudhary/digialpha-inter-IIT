/* eslint-disable react/prop-types */
import React from 'react';
import { PositiveOutlook, NegativeOutlook } from '@assets/icons';

const TickerCardComp = ({ label, C1, C2, value1, value2, color1, color2 }) => {
  return (
    <div className="p-6 mr-4 my-6 rounded-md soft-box-shadow flex miniStatCard flex-row justify-between bg-white">
      <p className="text-sm font-bold text-gray-800">{label}</p>
      <div>
        <div className='flex flex-column items-center space-x-6 justify-end' style={{color: `${color1}`}} >
          <div>{C1}</div>
          <div>{value1 ? <PositiveOutlook /> : <NegativeOutlook />}</div>
        </div>
        <div className='flex flex-column items-center space-x-6 justify-end' style={{color: `${color2}`}}>
          <div>{C2}</div>
          <div>{value2 ? <PositiveOutlook /> : <NegativeOutlook />}</div>
        </div>
      </div>
    </div>
  );
};

export default TickerCardComp;
