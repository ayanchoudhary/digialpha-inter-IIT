import { useQuery } from '@apollo/client';
import { GET_COMPANY_ALL_DETAILS_BY_NAME } from '@edgeServer/queries';
import { useEffect } from 'react';
import useStore from '../store';

export const useGetCompanyDetailsByName = async (companyName) => {
  const updateCompany = useStore((state) => state.updateCompany);
  const updateShowGlobalLoader = useStore((state) => state.updateShowGlobalLoader);
  const { startDate, endDate } = useStore((state) => state.timeFilter);

  useEffect(() => {
    updateShowGlobalLoader(true);
  }, [companyName, updateShowGlobalLoader]);

  const response = useQuery(GET_COMPANY_ALL_DETAILS_BY_NAME, {
    variables: { name: companyName, startDate, endDate },
    skip: !companyName,
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      updateCompany(data.company);
      updateShowGlobalLoader(false);
    },
  });

  return response;
};
