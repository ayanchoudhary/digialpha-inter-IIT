import React, { useEffect, useState } from 'react';
import useStore from '../store';
import { SearchIcon } from './../assets/icons';
import { useGetSearchCompany } from '../edgeServer/getSearchCompanies';
import { useLazyQuery } from '@apollo/client';
import { GET_SEARCH_COMPANY } from '@edgeServer/queries';
import { Link } from 'react-router-dom';
import { UnderlineB } from './../assets/icons';
import flowchart from './../assets/flowchart.png';
import Client from './landingTemplate/Client';
import Server from './landingTemplate/Server';
import ComputeEngine from './landingTemplate/ComputeEngine';

const Landing = () => {
  const [suggestions, setSuggestions] = useState([
    { name: 'Adobe Pvt Ltfd Company Demo', code: 'CIK123458973002345' },
    { name: 'Adobe Pvt Ltfd Company Demo', code: 'CIK123458973002345' },
    { name: 'Adobe Pvt Ltfd Company Demo', code: 'CIK123458973002345' },
  ]);
  const [searchText, setSearchText] = useState('');
  const searchCompanies = useStore((state) => state.searchCompanies);
  const updateSearchCompanies = useStore((state) => state.updateSearchCompanies);
  const [getSearchCompanies, { loading, error, data }] = useLazyQuery(GET_SEARCH_COMPANY, {
    variables: { search: searchText },
    skip: !searchText,
    fetchPolicy: 'cache-and-network',
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (data) updateSearchCompanies(data.searchCompany);
  }, [data]);

  useEffect(() => {
  }, [searchCompanies]);

  useEffect(() => {
    if (searchText.length > 2) {
      getSearchCompanies(searchText);
    }
  }, [searchText]);

  return (
    <div className="body flex flex-col items-center align-middle overflow-y-visible fontClass text-wide">
      <div className="background">
        <div className="landing-text text-center p-8 my-20 text-white">
          <div className="text-7xl font-semibold landing-main">
            Find the right information to <br /> fuel your business growth
          </div>
          <div className="text-xl p-6 font-normal leading-8">
            An intuitive way to query the key SaaS metrics from a pre-determined list <br />
            of metrics and useful analytics
          </div>
        </div>
        {/* Center align search bar */}
        <div className="flex flex-row justify-center space-x-4 -my-10 search-bar-div flex-start">
          <div className="flex flex-row items-center search-logo pl-2">
            <SearchIcon />{' '}
            <input
              className="w-2/4 rounded-lg bg-white p-2 text-lg text-center"
              placeholder="Search by Company Name or CIK number"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
          </div>
          <div>
            <button
              className="text-white rounded-lg p-4 ml-0"
              style={{ backgroundColor: '#005249' }}
            >
              SEARCH
            </button>
          </div>
        </div>
        {searchCompanies.length > 0 && showDropdown && (
          <div className="suggestions space-y-4 p-2  bg-white rounded-lg">
            {searchCompanies.map((suggestion, i) => {
              return (
                <Link to={`/company/${suggestion.name}`} key={i}>
                  <div className="suggestion-row flex flex-row justify-between px-2">
                    <div className="name">{suggestion.name}</div>
                    <div className="code">CIK: {suggestion.cik}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="solution flex py-60 flex-col">
        <div className="title text-center text-5xl font-bold">
          Our <span style={{ color: '#007B55' }}>Solution</span>
        </div>
        <div className="flex justify-center p-2">
          <UnderlineB />
        </div>
        <div className="text-center text-xl p-8 font-normal leading-8">
          Our application provides an intuitive way for any client/user to query the key SaaS
          metrics from a pre-determined <br /> list of metrics and also provides pre-computed
          analysis of certain parameters pertaining to the <br />
          company such as growth and overall sentimentality. The user is also provided with detailed
          analytics and <br />
          trends for easier data consumption and also provides a user with the option to download
          these metrics as a <br />
          CSV. This saves precious compute resources and cuts down on the time previously required
          to comb through <br />
          the entire filings of over 50K lines of text.
        </div>
      </div>
      <div className="graph flex flex-col justify-center">
        <img src={flowchart} className="w-9/12 self-center" />
        <div className="sol space-y-20">
          <div className="text-left font-normal text-3xl p-y4">
            Our solution contains three distinct layers as explained below:
          </div>
          <Client />
          <Server />
          <ComputeEngine />
          <div className="text-xl">
            All of these components mesh well together and are highly scalable thus providing a
            solution that gives the best possible results to the end-user with a very high accuracy
            and availability of the metrics.
          </div>
        </div>
      </div>
      <div className="problemsfaced mt-40 flex flex-col justify-center">
        <div className="title text-center text-5xl font-bold">
          Problems <span style={{ color: '#007B55' }}>Faced</span>
        </div>
        <div className="flex justify-center p-2">
          <UnderlineB />
        </div>
        <div className="text-center text-xl p-8 font-normal leading-8">
          The SEC&apos;s EDGAR database contains terabytes of documents and data, including press
          releases, annual <br />
          corporate filings, executive employment agreements, and investment company <br />
          holdings. While EDGAR has existed for over twenty years, it has been difficult for
          scholars to <br /> conduct or reproduce research based on EDGAR data. Often, researchers
          spend a lot of time <br /> and money on developing and redeveloping code to retrieve and
          parse EDGAR data, with no <br />
          common bottom-up framework.
        </div>
      </div>
    </div>
  );
};

export default Landing;
