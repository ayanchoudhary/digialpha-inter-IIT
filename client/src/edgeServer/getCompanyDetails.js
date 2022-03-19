import { useQuery } from '@apollo/client';
import { GET_COMPANY_ALL_DETAILS_BY_NAME } from '@edgeServer/queries';
import useStore from '../store';

export const useGetCompanyDetailsByName = async (companyName) => {
  const updateCompany = useStore((state) => state.updateCompany);
  const response = useQuery(GET_COMPANY_ALL_DETAILS_BY_NAME, {
    variables: { name: companyName },
    skip: !companyName,
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      updateCompany(data.company);
    },
  });

  return response;
};
