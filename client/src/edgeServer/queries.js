import { gql } from '@apollo/client';

export const GET_COMPANY_INFO_BY_NAME = gql`
  query company($name: String!) {
    company(name: $name) {
      id
      name
      cik
      sic
      symbol
      filingStart {
        quarter
        year
      }
    }
  }
`;
