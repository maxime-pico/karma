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
import { Grid, Row, Col } from '@smooth-ui/core-sc'

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
      karmas: '',
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeKarma = this.handleChangeKarma.bind(this);
    this.clearFilters = this.clearFilters.bind(this);

    this.categories = [];
    this.karmas = [];
  }

  /* Searching */

  handleChangeSearch(event) {
    // this.setState({ searchedValue: event.target.value });
    this.setState({ searchValue: event.target.value });
  }

  handleSubmitSearch(event) {
    event.preventDefault();
    this.setState({ searchedValue: this.state.searchValue });
  }

  clearSearchInput(event) {
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
    this.setState({ categories: this.categories.join(',') });
  }

  clearFilters(event) {
    this.categories = this.karmas = [];
    this.setState({ categories: '' })
    this.setState({ karmas: '' })
  }

  handleChangeKarma(event) {
    const targetValue = event.target.value;
    const index = this.karmas.indexOf(targetValue);

    if (index > -1) {
      this.karmas.splice(index, 1);
    } else {
      this.karmas.push(targetValue);
    }
    this.setState({ karmas: this.karmas.join(',') });
  }

  /* Render view */

  render() {

    const searchValue = this.state.searchValue;

    return (

      <Grid>

        {/* FILTERS */}

        <Row justifyContent={{ md: 'center' }} mt={'96px'}>
          <Col md={12}>

            {/* Filters - categories list -- TODO : transform elements into components */}

            Catégories :

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
                    {this.state.categories.length ? (<button onClick={this.clearFilters} >Supprimer les filtres x</button>) : ''}
                  </div>
                )
              }}
            </Query>

            {/* Filters - karmas list -- TODO : transform elements into components */}

            Karmas :

            <form>
              <label>Très Mauvais Karma <input onChange={this.handleChangeKarma} value="-2" name="karma" type="checkbox" /></label>
              <label>Plutôt Mauvais Karma <input onChange={this.handleChangeKarma} value="-1" name="karma" type="checkbox" /></label>
              <label>Karma Neutre <input onChange={this.handleChangeKarma} value="0" name="karma" type="checkbox" /></label>
              <label>Plutôt Bon Karma <input onChange={this.handleChangeKarma} value="1" name="karma" type="checkbox" /></label>
              <label>Très bon Karma <input onChange={this.handleChangeKarma} value="2" name="karma" type="checkbox" /></label>
            </form>

          </Col>
        </Row>

        {/* SEARCH AND SORT */}

        <Row justifyContent={{ md: 'center' }} mt={'96px'}>

          <Col md={8}>

            {/* Search input -- TODO : transform element into component */}
            <form onSubmit={this.handleSubmitSearch}>
              <SearchInput type="text" value={this.state.searchValue} onChange={this.handleChangeSearch} placeholder="Rechercher une marque" />
              <SearchSubmit type="submit">Rechercher</SearchSubmit>
              {searchValue.length ? (<button onClick={this.clearSearchInput} >x</button>) : ''}
            </form>

          </Col>

          <Col md={4}>
            Trier par :
            <select value={this.state.orderBy} onChange={this.handleChangeOrderBy}>
              <option value="name_ASC">Ordre alphabétique (A > Z)</option>
              <option value="name_DESC">Ordre alphabétique (Z > A)</option>
              <option value="karma_ASC">Karma (plus mauvais au meilleur)</option> {/* TODO */}
              <option value="karma_DESC">Karma (meilleur au plus mauvais)</option> {/* TODO */}
            </select>
          </Col>
        </Row>

        {/* RESULTS */}

        <Query query={COMPANY_LIST} variables={{
          filter: this.state.searchedValue,
          orderBy: this.state.orderBy,
          categories: this.state.categories,
          karmas: this.state.karmas,
        }} >

          {({ loading, error, data }) => {

            if (loading) return <div> Fetching </div>
            if (error) return <div> Error  </div>

            const companyList = data.allCompanies

            return (

              <Row justifyContent={{ md: 'center' }} mt={'96px'}>
                <Col md={8}>

                  <Title>
                    {
                      companyList.length ?
                        ('Les marques déjà sur Karma Panda :') :
                        ('Aucune marque ne correspond aux critères de recherche')
                    }
                  </Title>

                  {/*<SubTitle>
										Les 3 marques les plus notées (cool pour découvrir la
										plateforme) :
                  </SubTitle>*/}

                  {/* Results */}
                  <Row my={4} justifyContent={{ md: 'center' }}>
                    {companyList.map(company => (
                      <SearchResult
                        name={company.name}
                        id={company.id}
                        logo={company.logo}
                        karma={company.karma}
                        key={'s-' + company.id}
                      />
                    ))}
                  </Row>

                </Col>
              </Row>
            )
          }}
        </Query >
      </Grid>
    )
  }
}

export default Search
