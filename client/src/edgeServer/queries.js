import { gql } from '@apollo/client';

export const GET_COMPANY_ALL_DETAILS_BY_NAME = gql`
  query company($name: String!) {
    company(name: $name) {
      id
      name
      cik
      symbol
      filingStart {
        quarter
        year
      }
      acquisition {
        leads
        accounts
        conversion
        salesCycle
        cac
        filingDate {
          quarter
          year
        }
      }
      engagement {
        users
        penetration
        nps
        filingDate {
          quarter
          year
        }
      }
      revenue {
        rr
        growth
        arpa
        acv
        churnRate
        accountDist
        filingDate {
          quarter
          year
        }
      }
      unitEcon {
        ltv
        payback
        ltvRatio
        filingDate {
          quarter
          year
        }
      }
      saasGoals {
        growth
        profitability
        maturity
        retention
        filingDate {
          quarter
          year
        }
      }
    }
  }
`;

export const GET_SEARCH_COMPANY = gql`
  query searchCompany($search: String!) {
    searchCompany(search: $search) {
      id
      name
      cik
      symbol
      filingStart {
        quarter
        year
      }
    }
  }
`;
