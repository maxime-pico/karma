import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Row, Col, } from '@smooth-ui/core-sc'
import SearchSuggestedResult from './SearchSuggestedResult'
import BasicButton from './../../../components/buttons/BasicButton'

import LoaderContainer from '../../../components/loader/styles/LoaderContainer.css'
import BasicLoader from '../../../components/loader/BasicLoader'

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

const Title = styled.h3`
  font-size: 5rem;
  font-family: 'Avenir-Black', sans-serif;
`

const Description = styled.p`
  font-weight: bold;
`

const Band = styled.div`
  background-color:#535B65;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 4rem 5rem;
  border-radius:3rem;
  color: white;
  margin-bottom: 3rem;
`

const TitleBand = styled.h3`
  font-size: 2.5rem;
  color: white;
  margin-right: 2rem;
  text-align:right;
  width: 50%;
  font-family: 'Avenir-Black', sans-serif;
`

class SearchSuggested extends React.Component {

  constructor(props) {
    super(props)
    this.suggestBrand = this.props.suggestBrand.bind(this)
  }

  upVote() {
    console.log('UPVOTE')
  }

  render() {
    return (

      <div>
        <Row>
          <Col md={12}>
            <Title>Marques en attente d'évaluation</Title>
            <Description>Retrouvez les marques soumises par les utilisateurs qui seront<br />
              évaluées prochainement. Vous aussi vous souhaiteriez<br />
              connaître le karma d'une marque ? <span onClick={this.suggestBrand.bind(this)}>Suggérez-nous une marque</span></Description>
          </Col>
        </Row>

        <Query
          query={COMPANY_SUGGESTED_LIST}
        >
          {({ loading, error, data, refetch }) => {

            if (loading) return <LoaderContainer><BasicLoader /></LoaderContainer>
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
                        upVote={this.upVote}
                      />

                    ))}
                  </div>
                </Col>
              </Row>
            )
          }}
        </Query>

        <Row justifyContent={{ md: 'center' }}>
          <Col xs={12} md={8} >
            <Band>
              <TitleBand>Envie qu'une marque soit évaluée ?</TitleBand>
              <BasicButton onClick={this.suggestBrand}><strong>Suggérer une marque</strong></BasicButton>
            </Band>
          </Col>
        </Row>

      </div>
    )
  }
}

export default SearchSuggested
