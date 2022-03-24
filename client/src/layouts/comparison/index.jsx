import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetComparisonDetails } from '../../edgeServer/getCompanyDetails';
import useStore from '../../store';

const Comparison = () => {
  const { companyName1 } = useParams();
  const { companyName2 } = useParams();

  useGetComparisonDetails(companyName1, companyName2);

  const company1 = useStore((state) => state.company1);
  const company2 = useStore((state) => state.company2);
  console.log(company1);
  console.log(company2);

  return (
    <div>
      <div>{companyName1}</div>
      <div>{companyName2}</div>
    </div>
  );
};

export default Comparison;
