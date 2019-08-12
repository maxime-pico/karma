/*
This page is available at /brands. This page displays the list of brands
available on the plateform. Later it will be used to also perform search,
filters and ordering on the companies.
 */

// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SearchResult from './components/SearchResult'
import styled from 'styled-components'
import { Grid, Row, Col, } from '@smooth-ui/core-sc'
import { KARMA_LABELS, BRANDS_SORTING_LABELS, BRANDS_RESULTS_MESSAGES, BRANDS_STATIC_CONTENTS } from '../../utils'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

const SearchInput = styled.input``;
const SearchSubmit = styled.button``;

const Title = styled.div`
	font-size: 30px;
	font-weight: 900;
	color: #545a66;
	text-align: left;
	margin-bottom: 42px;
`

/*const SubTitle = styled.div`
	font-size: 16px;
	color: #7f8799;
	text-align: left;
	margin-bottom: 42px;
`*/

// preparing query that retireves the list of id, name and logos of all companies
const COMPANY_LIST = gql(`
	query CompanyList($filter: String, $orderBy: CompanyOrderByInput, $categories: String, $karmas: String) {
		allCompanies(orderBy: $orderBy, filter: $filter, categories: $categories, karmas: $karmas) {
			id
			name
      logo
      karma
    }
	}
`);

// preparing query that retireves the list of categories id, name
const COMPANY_CATEGORY_LIST = gql(`
	query CompanyCategoryList($filter: String, $orderBy: CompanyCategoryOrderByInput) {
		allCompanyCategories(orderBy: $orderBy, filter: $filter) {
			id
			name
		}
	}
`);

// Search component: displays the list of companies in the database
class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      searchedValue: '',
      orderBy: 'name_ASC',
      categories: '',
      karmas: [],
      reloaded : false,
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeKarma = this.handleChangeKarma.bind(this);
    this.clearFilters = this.clearFilters.bind(this);

    this.categories = [];
    this.karmas = []
  }

  /* Searching */

  handleChangeSearch(event) {
    this.setState({ searchedValue: event.target.value });
    this.setState({ searchValue: event.target.value });
  }

  handleSubmitSearch(event) {
    event.preventDefault();
    this.setState({ searchedValue: this.state.searchValue });
  }

  clearSearchInput() {
    this.setState({ searchedValue: '' });
    this.setState({ searchValue: '' });
  }

  /* Sorting */

  handleChangeOrderBy(event) {
    this.setState({ orderBy: event.target.value });
  }

  /* Filtering */

  handleChangeCategory(event) {
    const targetValue = event.target.value;
    const index = this.categories.indexOf(targetValue);

    if (index > -1) {
      this.categories.splice(index, 1);
    } else {
      this.categories.push(targetValue);
    }
    this.setState({reloaded : true})
    this.setState({ categories: this.categories.join(',') });
  }

  clearFilters() {
    this.categories = [];
    this.karmas = []
    this.setState({ categories: '' })
    this.setState({ karmas: [] })
  }

  resetReload() {
    this.setState({reloaded : false})
  }

  handleChangeKarma(event) {
    const targetValue = event.target.value;
    const index = this.state.karmas.indexOf(targetValue);
    const karmas = this.state.karmas;
    if (index > -1) {
      karmas.splice(index, 1);
    } else {
      karmas.push(targetValue);
    }
    this.setState({ karmas: karmas });
  }

  /* Render view */

  renderSearchInput({ input, meta }) {
    return (
      <div>
        <input type="text" />
      </div>
    )
  }

  renderKarmaFilter({ input, meta }) {
    return (
      <div>
        <input type="checkbox" />
      </div>
    )
  }

  render() {

    const searchValue = this.state.searchValue;

    return (

      <Grid>

        {/* FILTERS */}

        <Row justifyContent={{ md: 'center' }} mt={'96px'}>
          <Col md={12}>

            {/* Filters - categories list -- TODO : transform elements into components */}

            {BRANDS_STATIC_CONTENTS.filters_categories_title['fr']}

            <Query query={COMPANY_CATEGORY_LIST} >
              {({ loading, error, data }) => {
                if (loading) return <div> Fetching Categories</div>
                if (error) return <div> Error while loading categories</div>

                const companyCategoryList = data.allCompanyCategories

                return (
                  <div className="filters">
                    <form>
                      {companyCategoryList.map(category => (
                        <label key={'s-' + category.id}>
                          {category.name}
                          <input type="checkbox" checked={(this.state.categories.indexOf(category.id) > -1 ? 'checked' : '')} value={category.id} name="category" onChange={this.handleChangeCategory} />
                        </label>
                      ))}
                    </form>

                  </div>
                )
              }}
            </Query>

            {/* Filters - karmas list -- TODO : transform elements into components */}

            {BRANDS_STATIC_CONTENTS.filters_karmas_title['fr']}

            <form>
              {Object.entries(KARMA_LABELS).map(([k, karma], index) => (
                <label key={'k-' + index}> {karma.label['fr']}
                  <input component={this.renderKarmaField}  checked={(this.state.karmas.indexOf(karma.slug) > -1 ? 'checked' : '')}
                    onChange={this.handleChangeKarma}
                    value={karma.slug}
                    name="karma"
                    type="checkbox"
                  />
                </label>
              ))}
            </form>

            {(this.state.categories.length || this.state.karmas.length) ? (<button onClick={this.clearFilters} >Supprimer les filtres x</button>) : ''}

          </Col>
        </Row>

        {/* SEARCH AND SORT */}

        <Row justifyContent={{ md: 'center' }} mt={'96px'}>

          <Col md={8}>

            {/* Search input -- TODO : transform element into component */}
            <form onSubmit={this.handleSubmitSearch}>
              <SearchInput value={this.state.searchValue} onChange={this.handleChangeSearch} component={this.renderSearchInput} placeholder={BRANDS_STATIC_CONTENTS.search_input_placeholder['fr']} />
              {searchValue.length ? (<button onClick={this.clearSearchInput} >x</button>) : ''}
            </form>

          </Col>

          <Col md={4}>
            {BRANDS_STATIC_CONTENTS.sorting_title['fr']}

            <select value={this.state.orderBy} onChange={this.handleChangeOrderBy}>
              {BRANDS_SORTING_LABELS.map((sort, index) => (
                <option key={'sort-' + index} value={sort.value}>{sort.name['fr']}</option>
              ))}
            </select>
          </Col>
        </Row>

        {/* RESULTS */}

        <Query query={COMPANY_LIST} variables={{
          filter: this.state.searchedValue,
          orderBy: this.state.orderBy,
          categories: this.state.categories,
          karmas: this.state.karmas.join(','),
        }} onCompleted={() => {this.resetReload()}} >

          {({ loading, error, data }) => {

            if (loading)  return <div> Fetching </div>
            if (error) return <div> Error  </div>
            
            const companyList = data.allCompanies

            return (

              <Row justifyContent={{ md: 'center' }} mt={'96px'}>
                <Col md={8}>
              
                  <Title>
                    {
                      companyList.length ?
                      (BRANDS_RESULTS_MESSAGES.main_results['fr']) :
                      (BRANDS_RESULTS_MESSAGES.no_results['fr'])
                    }
                  </Title>

                  {/*<SubTitle>
										Les 3 marques les plus notées (cool pour découvrir la
										plateforme) :
                  </SubTitle>*/}

                  {/* Results */}
                 
                  <Row my={4} justifyContent={{ md: 'center' }}>

                    <TransitionGroup  className="results-list">

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
                    
                  </Row>                  
                </Col>
              </Row>
            )
          }}
        </Query >
      </Grid >
    )
  }
}

export default Search
