import React from 'react';
import { UnderlineG } from '../../assets/icons';
// import { useParams } from 'react-router-dom';

const ComputeEngine = () => {
  // const { companyName } = useParams();
  // console.log(companyName);
  return (
    <div className="fontClass space-y-8 tracking-wide">
      <div className="fontNunito font-bold text-3xl leading-9" style={{ color: '#007B55' }}>
        Compute Engine
      </div>
      <div className="font-normal text-xl leading-8 text-justify">
        The compute engine consists of three services: a web scraper, a parser for parsing data from
        the SEC filings, and an ML model to generate data points from the parsed data. It also
        contains scripts to add the data to the NoSQL database. The compute engine computes
        asynchronously due to the high runtime of its operations and regularly commits data to the
        NoSQL database. For the computation of SaaS goals or sentiment analysis which we need in
        real-time the compute engine is polled by the server to provide the result.
      </div>
      <div>
        <UnderlineG />
      </div>
    </div>
  );
};

export default ComputeEngine;
