/* eslint-disable react/prop-types */
import { ArrowDown } from '@assets/icons';
import { Select } from 'antd';
import React, { useCallback } from 'react';
import useStore from '../../store';

const { Option } = Select;

const VALID_QTR_OPTIONS = ['Q1', 'Q2', 'Q3', 'Q4'];
const BASE_YEAR = 2014;
export const CURRENT_TIME = {
  qtr: 'Q1',
  year: 2022,
};

const TimeFilter = () => {
  const { startDate, endDate } = useStore((state) => state.timeFilter);
  const { qtr: startQtr, year: startYear } = parseDate(startDate);
  const { qtr: endQtr, year: endYear } = parseDate(endDate);

  const { updateStartDate, updateEndDate } = useStore();

  const selectStartYear = useCallback(
    (value) => updateStartDate(`${startQtr}-${value}`),
    [startQtr, updateStartDate],
  );

  const selectEndYear = useCallback(
    (value) => updateEndDate(`${endQtr}-${value}`),
    [endQtr, updateEndDate],
  );

  const selectStartQtr = useCallback(
    (value) => updateStartDate(`${value}-${startYear}`),
    [startYear, updateStartDate],
  );

  const selectEndQtr = useCallback(
    (value) => updateEndDate(`${value}-${endYear}`),
    [endYear, updateEndDate],
  );

  const dropdownRender = useCallback(
    () => (
      <>
        <div className="flex justify-between p-4 gap-4 items-center">
          <p className="font-semibold text-gray-500 m-0 w-10">From:</p>
          <div className="flex-grow">
            <Select value={startYear} onSelect={selectStartYear} suffixIcon={<ArrowDown />}>
              {getOptions(getFilterOptionsYears(BASE_YEAR, endYear))}
            </Select>
          </div>
          <div className="flex-grow">
            <Select value={startQtr} onSelect={selectStartQtr} suffixIcon={<ArrowDown />}>
              {getOptions(VALID_QTR_OPTIONS)}
            </Select>
          </div>
        </div>
        <div className="flex justify-between p-4 gap-4 items-center">
          <p className="font-semibold text-gray-500 m-0 w-10">To:</p>
          <div className="flex-grow">
            <Select value={endYear} onSelect={selectEndYear} suffixIcon={<ArrowDown />}>
              {getOptions(getFilterOptionsYears(startYear, CURRENT_TIME.year))}
            </Select>
          </div>
          <div className="flex-grow">
            <Select value={endQtr} onSelect={selectEndQtr} suffixIcon={<ArrowDown />}>
              {getOptions(VALID_QTR_OPTIONS)}
            </Select>
          </div>
        </div>
      </>
    ),
    [
      startYear,
      startQtr,
      endYear,
      endQtr,
      selectStartYear,
      selectEndYear,
      selectStartQtr,
      selectEndQtr,
    ],
  );

  return (
    <div className="soft-box-shadow rounded">
      <Select
        value={getLabelFromFilter(startDate, endDate)}
        dropdownRender={dropdownRender}
        dropdownClassName="timeFilterDropdown"
        bordered={false}
        suffixIcon={<ArrowDown />}
      />
    </div>
  );
};

const getOptions = (options) => (
  <>
    {options.map((v) => (
      <Option key={v} value={v}>
        {v}
      </Option>
    ))}
  </>
);

const getLabelFromFilter = (startDate, endDate) => {
  const { qtr: startQtr, year: startYear } = parseDate(startDate);
  const { qtr: endQtr, year: endYear } = parseDate(endDate);

  return `Showing data from ${startYear} (${startQtr}) to ${endYear} (${endQtr})`;
};

const getFilterOptionsYears = (startYear, endYear) =>
  [...Array(endYear - startYear + 1).keys()].map((year) => parseInt(startYear) + year);

const parseDate = (date) => {
  const [qtr, year] = date.split('-');
  return { qtr, year };
};

export default TimeFilter;
