/* eslint-disable react/prop-types */
import React from 'react';
import { PositiveOutlook, NegativeOutlook } from '@assets/icons';

const DataCard = ({ label, C1, C2, value1, value2, color1, color2 }) => {
  return (
    <div className="p-6 mr-4 my-6 rounded-md soft-box-shadow flex flex-row w-1/4 justify-between flex-shrink-0 bg-white">
      <p className="text-sm font-bold text-gray-800">{label}</p>
      <div>
        <div style={{color: `${color1}`}} className='flex flex-column px-6 space-x-6 justify-end'>
          <div>{C1}</div>
          <div>{value1}</div>
        </div>
        <div style={{color: `${color2}`}} className='flex flex-column px-6 space-x-6 justify-end'>
          <div>{C2}</div>
          <div>{value2}</div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
