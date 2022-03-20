/* eslint-disable react/prop-types */
import React from 'react';
import { PositiveOutlook, NegativeOutlook } from '@assets/icons';

const TickerCard = ({ label, value }) => {
  return (
    <div className="p-6 mr-4 my-6 rounded-md soft-box-shadow flex flex-row miniStatCard justify-between flex-shrink-0 bg-white">
      <p className="text-sm font-bold text-gray-800">{label}</p>
      <div>{value ? <PositiveOutlook /> : <NegativeOutlook />}</div>
    </div>
  );
};

export default TickerCard;
