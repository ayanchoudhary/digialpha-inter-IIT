import React from 'react';
import { UnderlineG } from './../../assets/icons';
// import { useParams } from 'react-router-dom';

const Client = () => {
  // const { companyName } = useParams();
  // console.log(companyName);
  return (
    <div className="fontClass space-y-8 tracking-wide">
      <div className="fontNunito font-bold text-3xl leading-9" style={{ color: '#007B55' }}>
        Client
      </div>
      <div className="font-normal text-xl leading-8 text-justify">
        A client can perform 3 possible broad categories of operations: fetching company metrics and
        displaying trends, downloading company data points, and comparing different companies. The
        client receives all the data in the form of graphql queries and suitably displays the data
        to enable maximum data consumption.
      </div>
      <div>
        <UnderlineG />
      </div>
    </div>
  );
};

export default Client;
