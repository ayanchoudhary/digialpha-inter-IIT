import { gql } from '@apollo/client';

export const GET_COMPANY_BY_NAME = gql`
  query company(name: "Apple") {
	id
  	name
  	cik
  	sic
  	symbol
    filingStart {
      quarter
      year
    }
}`;
