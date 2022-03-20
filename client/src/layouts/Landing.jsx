import React from 'react';
import test from './../assets/logo.png';
import { SearchIcon } from './../assets/icons';
const Landing = () => {
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
        <div className="flex flex-row justify-center space-x-4 -my-10">
          <div className="flex flex-row items-center search-logo pl-2">
            <SearchIcon/>{' '}
            <input
              className="w-2/4 rounded-lg bg-white p-2 text-lg text-center"
              placeholder="Search by Company Name or CIK number"
            ></input>
          </div>

          <div>
            <button className="bg-black text-white rounded-lg p-4 ml-0">SEARCH</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
