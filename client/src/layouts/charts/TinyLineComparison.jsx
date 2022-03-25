/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, Legend } from 'recharts';
import combineDatasets from '../../services/combineComparisonChartData';

const TinyLineComparison = ({
  color1,
  color2,
  data1,
  data2,
  val,
  tooltipFormatter,
  legendPayload,
}) => {
  const combinedDataset = useMemo(() => combineDatasets(data1, data2, val), [data1, data2, val]);

  return (
    <ResponsiveContainer width={300} height={300}>
      <LineChart width={300} height={300} data={combinedDataset}>
        <Tooltip formatter={tooltipFormatter} />
        <Legend payload={legendPayload} />
        <Line type="monotone" dataKey="value1" stroke={color1} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} dot={false} />
        <XAxis dataKey="date" hide />
      </LineChart>
    </ResponsiveContainer>
  );
  // return <></>;
};

export default TinyLineComparison;
