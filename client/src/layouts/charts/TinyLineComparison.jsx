/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import combineDatasets from '../../services/combineComparisonChartData';

const TinyLineComparison = ({ color1, color2, data1, data2, val }) => {
  const combinedDataset = useMemo(() => combineDatasets(data1, data2, val), [data1, data2, val]);

  return (
    <ResponsiveContainer width={120} height="100%">
      <LineChart width={120} height={120} data={combinedDataset}>
        <Tooltip />
        <Line type="monotone" dataKey="value1" stroke={color1} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} dot={false} />
        <XAxis dataKey="date" hide />
      </LineChart>
    </ResponsiveContainer>
  );
  // return <></>;
};

export default TinyLineComparison;
