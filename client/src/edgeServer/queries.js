import { gql, useQuery } from '@apollo/client';

export const GET_COMPANY = gql`
  query GET_COMPANY {
    COMPANY {
      id
      name
      filingStart {
        quarter
        year
      }
      cik 
      sic
      acquisition {
        leads
        accounts
        conversion
        salesCycle
        cac
      }
      engagement{
        users
        penetration
        nps
      }
      revenue{
        rr
        growth
        arpa
        acv
      }
      unitEcon{
        ltv
        payback
        ltvRatio
      }
    }`;


