/* eslint-disable react/prop-types */
import React from 'react';
import TinyLineComparison from '../charts/TinyLineComparison';
import { getCumulativeSum } from '@utils/utils';

const MinStatCardComparison = ({
  label,
  color1,
  color2,
  graphData1,
  graphData2,
  val,
  tooltipFormatter,
  legendPayload,
  showTotal,
}) => {
  return (
    <div className="p-6 mr-4 my-6 rounded-md soft-box-shadow miniStatCard flex-shrink-0 bg-white">
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
        {showTotal && (
          <div className="flex justify-center gap-4">
            <p className="text-gray-500">Total:</p>
            <p className="font-semibold" style={{ color: color1 }}>
              {getCumulativeSum(graphData1, val)}
            </p>
            <p className="font-semibold" style={{ color: color2 }}>
              {getCumulativeSum(graphData2, val)}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center ml-2">
        <TinyLineComparison
          color1={color1}
          color2={color2}
          data1={graphData1}
          data2={graphData2}
          val={val}
          tooltipFormatter={tooltipFormatter}
          legendPayload={legendPayload}
        />
      </div>
    </div>
  );
};

export default MinStatCardComparison;
