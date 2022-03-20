import useStore from '../store';
import React from 'react';
import TickerCard from './TickerCard';
import { last } from 'lodash';

const Ticker = () => {
  const { saasGoals } = useStore((state) => state.company);
  const lastSaasGoalStatus = last(saasGoals);

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
    </>
  );
};

export default Ticker;
