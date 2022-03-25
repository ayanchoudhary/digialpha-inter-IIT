/* eslint-disable react/prop-types */
import React from 'react';
import TinyLineComparison from '../charts/TinyLineComparison';

const MinStatCardComparison = ({
  label,
  color1,
  color2,
  graphData1,
  graphData2,
  val,
  tooltipFormatter,
  legendPayload,
}) => {
  return (
    <div className="p-6 mr-4 my-6 rounded-md soft-box-shadow miniStatCard flex-shrink-0 bg-white">
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
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
