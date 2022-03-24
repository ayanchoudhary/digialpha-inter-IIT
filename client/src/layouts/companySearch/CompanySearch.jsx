/* eslint-disable react/prop-types */
import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useLazyQuery } from '@apollo/client';
import { GET_SEARCH_COMPANY } from '@edgeServer/queries';
import { Link } from 'react-router-dom';

const Option = Select.Option;

const CompanySearch = (props) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const [getSearchCompanies] = useLazyQuery(GET_SEARCH_COMPANY, {
    fetchPolicy: 'cache-and-network',
  });

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = async (value) => {
      setOptions([]);
      setFetching(true);

      const { data } = await getSearchCompanies({ variables: { search: value } });
      setOptions(
        data?.searchCompany?.map(({ name, cik }) => ({
          name,
          cik,
        })),
      );
      setFetching(false);
    };

    return debounce(loadOptions, 800);
  }, [getSearchCompanies]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      mode="multiple"
      className='py-2 px-6 text-base'
    >
      {options.map(({ name, cik }) => (
        <Option key={cik} value={name}>
          <Link to={`/company/${name}`}>
            <div className="flex justify-between">
              <span className="text-gray-900">{name}</span>
              <span className="text-gray-400">CIK: {cik}</span>
            </div>
          </Link>
        </Option>
      ))}
    </Select>
  );
};

export default CompanySearch;
