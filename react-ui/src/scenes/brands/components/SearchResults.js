import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Row, Col, } from '@smooth-ui/core-sc'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import { BRANDS_RESULTS_MESSAGES } from '../../../utils'
import SearchResult from './SearchResult'

const Title = styled.div`
	font-size: 30px;
	font-weight: 900;
	color: #545a66;
	text-align: left;
	margin-bottom: 42px;
	@media (max-width: 540px) {
		padding: 0 24px;
	}
`

const COMPANY_LIST = gql(`
query CompanyList(
  $filter: String, 
  $orderBy: CompanyOrderByInput, 
  $categories: String, 
  $karmas: String
) {
  allCompanies(
    orderBy: $orderBy, 
    filter: $filter, 
    categories: $categories, 
    karmas: $karmas
  ) {
    id
    name
    logo
    karma
    validated
  }
}
`);

class SearchResults extends React.Component {

  state = {
    searchValue: '',
    searchedValue: '',
    orderBy: 'karma_DESC',
    categories: '',
    karmas: [],
    reloaded: false,
  }

  constructor(props) {
    super(props)

    this.categories = [];
    this.karmas = []
    this.refetch = null
    this.setState({ orderBy: this.props.orderBy })
  }

  componentDidMount() {
    if (this.refetch) {
      this.refetch()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ categories: nextProps.categories })
    this.setState({ karmas: nextProps.karmas })
    this.setState({ orderBy: nextProps.orderBy })
    this.setState({ searchedValue: nextProps.searchedValue })
    this.setState({ reloaded: nextProps.reloaded })
  }

  resetReload() {
    this.setState({ reloaded: false })
  }

  render() {
    return (

      <Query
        query={COMPANY_LIST}
        variables={{
          filter: this.state.searchedValue,
          orderBy: this.state.orderBy,
          categories: this.state.categories,
          karmas: this.state.karmas.join(','),
        }}
        onCompleted={() => { this.resetReload() }}
      >

        {({ loading, error, data, refetch }) => {

          if (loading) return <div> Fetching </div>
          if (error) return <div> Error  </div>

          this.refetch = refetch

          const companyList = data.allCompanies

          return (

            <Row justifyContent={{ md: 'center' }} mt={'2rem'}>
              <Col md={12}>

                <Title>
                  {
                    !companyList.length && (BRANDS_RESULTS_MESSAGES.no_results['fr'])
                  }
                </Title>

                {/* Results */}

                <TransitionGroup className="results-list">

                  {companyList.map(company => (

                    <CSSTransition
                      key={company.id}
                      timeout={300}
                      classNames="result-fade"
                      exit={this.state.reloaded}
                    >

                      <SearchResult
                        name={company.name}
                        id={company.id}
                        logo={company.logo}
                        karma={company.karma}
                        key={'s-' + company.id}
                      />

                    </CSSTransition>
                  ))}

                </TransitionGroup>

              </Col>
            </Row>
          )
        }}
      </Query>
    )
  }
}

export default SearchResults
