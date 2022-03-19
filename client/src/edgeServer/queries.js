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

export const GET_COMPANY_ACQUISITIONS_BY_NAME = gql`
  query company($name: String!) {
    company(name: $name) {
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
      }
    }
  }
`;

export const GET_COMPANY_ENGAGEMENT_BY_NAME = gql`
  query company($name: String!) {
    company(name: $name) {
      filingStart {
        quarter
        year
      }
      engagement {
        users
        penetration
        nps
      }
    }
  }
`;

export const GET_COMPANY_REVENUE_BY_NAME = gql`
  query company($name: String!) {
    company(name: $name) {
      filingStart {
        quarter
        year
      }
      revenue {
        rr
        growth
        arpa
        acv
        churnRate
        accountDist
      }
    }
  }
`;

export const GET_COMPANY_UNIT_ECONOMY_BY_NAME = gql`
  query company($name: String!) {
    company(name: $name) {
      filingStart {
        quarter
        year
      }
      unitEcon {
        ltv
        ltvRatio
        payback
      }
    }
  }
`;
