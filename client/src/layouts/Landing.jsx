import React, { useEffect, useState } from 'react';
import useStore from '../store';
import test from './../assets/logo.png';
import { SearchIcon } from './../assets/icons';
import { useGetSearchCompany } from '../edgeServer/getSearchCompanies';
import { useLazyQuery } from '@apollo/client';
import { GET_SEARCH_COMPANY } from '@edgeServer/queries';
import { Link } from 'react-router-dom';

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
    console.log(searchCompanies);
  }, [searchCompanies]);

  useEffect(() => {
    if (searchText.length > 2) {
      getSearchCompanies(searchText);
    }
  }, [searchText]);

  return (
    <div className="flex items-center align-middle">
      <div className="background">
        <div className="logo">
          <img src={test} className="p-6" />
        </div>
        <div className="landing-text text-center p-8 my-20 text-white">
          <div className="text-7xl">
            Find the right information to <br /> fuel your business growth
          </div>
          <div className="text-2xl p-6">
            Join a vibrant community of MSPs to forge long-lasting relationships with partners
            <br /> that help you create excellent customer experiences
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
            <button className="bg-black text-white rounded-lg p-4 ml-0">SEARCH</button>
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
    </div>
  );
};

export default Landing;
