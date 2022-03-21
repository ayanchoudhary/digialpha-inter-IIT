import useStore from '../store';
import React from 'react';
import TickerCard from './TickerCard';
import { last } from 'lodash';

const Ticker = () => {
  const { saasGoals } = useStore((state) => state.company);
  const { sentiment } = useStore((state) => state.company);
  const lastSaasGoalStatus = last(saasGoals);
  const lastSentiment = last(sentiment);

  if (!lastSaasGoalStatus) return null;

  const { growth, profitability, maturity, retention } = lastSaasGoalStatus;

  return (
    <>
      <div>
        <TickerCard label="Growth" value={growth} />
      </div>
      <div>
        <TickerCard label="Profitability" value={profitability} />
      </div>
      <div>
        <TickerCard label="Maturity" value={maturity} />
      </div>
      <div>
        <TickerCard label="Retention" value={retention} />
      </div>
      <div>
        <TickerCard label="Sentiment" value={lastSentiment} />
      </div>
    </>
  );
};

export default Ticker;
