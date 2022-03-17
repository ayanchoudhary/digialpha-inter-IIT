import { useQuery } from '@apollo/client';
import { GET_COMPANY_ENGAGEMENT_BY_NAME } from '@edgeServer/queries';

export const useGetEngagement = (companyName) => {
  const response = useQuery(GET_COMPANY_ENGAGEMENT_BY_NAME, {
    variables: { name: companyName },
    skip: !companyName,
  });

  return response;
};
