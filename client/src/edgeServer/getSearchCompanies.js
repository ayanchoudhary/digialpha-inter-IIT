import { useQuery } from '@apollo/client';
import { GET_SEARCH_COMPANY } from '@edgeServer/queries';
import useStore from '../store';

export const useGetSearchCompany = async (searchText) => {
  const updateSearchCompanies = useStore((state) => state.updateSearchCompanies);
  const response = useQuery(GET_SEARCH_COMPANY, {
    variables: { search: searchText },
    skip: !searchText,
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      updateSearchCompanies(data.searchCompany);
    },
  });

  return response;
};
