import React from 'react';
import { useParams } from 'react-router-dom';
import TickerCard from './TickerCard';

const Ticker = () => {
  return (
    <div className="ticker flex flex-row miniStatCard justify-between items-center">
      <div>
        <TickerCard label="Growth" value={true} />
      </div>
      <div>
        <TickerCard label="Profitability" value={false} />
      </div>
      <div>
        <TickerCard label="Maturity" value={true} />
      </div>
      <div>
        <TickerCard label="Retention" value={false} />
      </div>
    </div>
  );
};

export default Ticker;
