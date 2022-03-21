import React from 'react';
import { UnderlineG } from '../../assets/icons';
// import { useParams } from 'react-router-dom';

const Server = () => {
  // const { companyName } = useParams();
  // console.log(companyName);
  return (
    <div className="fontClass space-y-8 tracking-wide">
      <div
        className="fontNunito font-bold text-3xl leading-9 self-end text-right"
        style={{ color: '#007B55' }}
      >
        Server
      </div>
      <div className="font-normal text-xl leading-8 text-justify">
        The server acts as the facilitator between the client and compute engine and the NoSQL
        database. The server is a flask server hosted on the web and provides various endpoints for
        the graphql queries and the downloadable CSV content. Furthermore, the server also fetches
        data from the compute engine for metrics such as growth and maturity and sentiment analysis
        in real time and forwards it to the client.
      </div>
      <div className="flex flex-row-reverse">
        <UnderlineG />
      </div>
    </div>
  );
};

export default Server;
