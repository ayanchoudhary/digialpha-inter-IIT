/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';
import { ArrowDown } from '@assets/icons';
import LargeLineChart from '@layouts/charts/LargeLineChart';

const Option = Select.Option;

const ChartWrapper = ({ chartLabel, type }) => {
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
      <div>
        <LargeLineChart />
      </div>
    </div>
  );
};

export default ChartWrapper;
