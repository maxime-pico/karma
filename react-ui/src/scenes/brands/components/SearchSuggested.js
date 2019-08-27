import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Row, Col, } from '@smooth-ui/core-sc'
import SearchSuggestedResult from './SearchSuggestedResult'

const COMPANY_SUGGESTED_LIST = gql(`
  query CompanyList {
    suggestedCompanies {
      id
      name
      logo
      karma
      validated
    }
  }
`);

class SearchSuggested extends React.Component {

  render() {
    return (

      <div>
        <Row>
          <Col md={12}>
            <h2>Marques en attente d'évaluation</h2>
            <p>Retrouvez les marques soumises par les utilisateurs qui seront évaluées prochainement. Vous aussi vous souhaiteriez connaître le karma d'une marque ? Suggérez-nous une marque</p>
          </Col>
        </Row>

        <Query
          query={COMPANY_SUGGESTED_LIST}
        >
          {({ loading, error, data, refetch }) => {

            if (loading) return <div> Fetching </div>
            if (error) return <div> Error  </div>

            const companyList = data.suggestedCompanies

            return (
              <Row justifyContent={{ md: 'center' }} mt={'2rem'}>
                <Col md={12}>
                <div className="results-list">
                  {companyList.map(company => (

                   

                      <SearchSuggestedResult
                        name={company.name}
                        id={company.id}
                        logo={company.logo}
                        karma={company.karma}
                        key={'s-' + company.id}
                      />

                    
                  ))}
                  </div>
                </Col>
              </Row>
            )
          }}
        </Query>
      </div>
    )
  }

}

export default SearchSuggested
