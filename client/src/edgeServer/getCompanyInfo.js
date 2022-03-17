import { useQuery } from '@apollo/client';
import { GET_COMPANY_INFO_BY_NAME } from '@edgeServer/queries';

export const useGetCompanyInfoByName = (companyName) => {
  const response = useQuery(GET_COMPANY_INFO_BY_NAME, {
    variables: { name: companyName },
    skip: !companyName,
  });

  return response;
};
