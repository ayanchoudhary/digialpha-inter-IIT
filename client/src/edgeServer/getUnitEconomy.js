import { useQuery } from '@apollo/client';
import { GET_COMPANY_UNIT_ECONOMY_BY_NAME } from '@edgeServer/queries';

export const useGetUnitEconomy = (companyName) => {
  const response = useQuery(GET_COMPANY_UNIT_ECONOMY_BY_NAME, {
    variables: { name: companyName },
    skip: !companyName,
  });

  return response;
};
