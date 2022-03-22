import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnderlineB } from './../assets/icons';
import flowchart from './../assets/flowchart.png';
import Client from './landingTemplate/Client';
import Server from './landingTemplate/Server';
import ComputeEngine from './landingTemplate/ComputeEngine';
import CompanySearch from '@layouts/companySearch/CompanySearch';

const Landing = () => {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    ({ value }) => {
      navigate(`/company/${value}`);
    },
    [navigate],
  );

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
          <div className="flex flex-row items-center search-logo ">
            <CompanySearch
              style={{ width: '100%' }}
              placeholder="Search by Company Name or CIK number"
              value={[]}
              onSelect={handleSelect}
            />
          </div>
        </div>
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
