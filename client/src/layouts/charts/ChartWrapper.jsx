/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { ArrowDown } from '@assets/icons';
import LargeLineChart from '@layouts/charts/LargeLineChart';
import { CHART_TYPES } from '@constants/variations';
import LargeBarChart from '@layouts/charts/LargeBarChart';
import LargeBarChartHz from '@layouts/charts/LargeBarChartHz';

const Option = Select.Option;

const getChartFromType = (type, data, val) => {
  switch (type) {
    case CHART_TYPES.LINE:
      return <LargeLineChart data={data} val={val}/>;
    case CHART_TYPES.BAR:
      return <LargeBarChart data={data} val={val} />;
    case CHART_TYPES.BAR_HZ:
      return <LargeBarChartHz data={data} val={val} />;
    default:
      return;
  }
};

const ChartWrapper = ({ chartLabel, type, data, val }) => {
  return (
    <div className="bg-white soft-box-shadow rounded-3xl p-6 chartWrapper">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-lg text-gray-900">{chartLabel}</h1>
          <p className="text-gray-500 text-sm">+ 2.6% than last year</p>
        </div>
        <Select
          defaultValue="yearly"
          className="bg-gray-100 rounded-lg"
          bordered={false}
          suffixIcon={<ArrowDown />}
          style={{ width: 120 }}
        >
          <Option value="yearly">Yearly</Option>
          <Option value="quarterly">Quarterly</Option>
        </Select>
      </div>
      <div>{getChartFromType(type, data, val)}</div>
    </div>
  );
};

export default ChartWrapper;
