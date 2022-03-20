import React from 'react';
import TickerCard from './TickerCard';

const Ticker = () => {
  return (
    <>
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
      <div>
        <TickerCard label="Sentiment" value={false} />
      </div>
    </>
  );
};

export default Ticker;
