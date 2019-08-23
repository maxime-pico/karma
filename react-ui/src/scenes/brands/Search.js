/*
This page is available at /brands. This page displays the list of brands
available on the plateform. Later it will be used to also perform search,
filters and ordering on the companies.
 */

// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Grid, Row, Col, } from '@smooth-ui/core-sc'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import { KARMA_LABELS, BRANDS_SORTING_LABELS, BRANDS_RESULTS_MESSAGES, BRANDS_STATIC_CONTENTS } from '../../utils'
import icon_magnifier from '../../images/icons/loupe.svg'
import SearchResult from './components/SearchResult'
import Select from './../../components/form/Select'
import PrettyCheckbox from './../../components/form/PrettyCheckbox'
import BasicButton from './../../components/buttons/BasicButton'

const SearchInput = styled.input`
  border-radius: 3rem;
  padding: 1rem 0.8rem 1rem 5.5rem;
  width: 100%;
  height: 6rem;
  font-size: 1.6rem;
  border: 0;
  background-color: white;
  background-image: url(${icon_magnifier});
  background-repeat: no-repeat;
  background-position: 1.5rem center;
  background-size: auto 3rem;

  &::placeholder {
    opacity: 0.6;
  }
`;

const SearchInputClearButton = styled.button`
  border-radius: 3rem;
  height: 3rem;
  width: 3rem;
  line-height: 1.4rem;
  background-color: #ccc;
  padding: 0.5rem 0.8rem;
  border: 2px solid #ececec;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  :hover {
    background-color: #45bcb6;
    color: white;
  }
`;

const SearchInputForm = styled.form`
  width: 100%;
  position:relative;
`;

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
    }
	}
`);

// preparing query that retireves the list of categories id, name
const COMPANY_CATEGORY_LIST = gql(`
	query CompanyCategoryList(
    $filter: String, 
    $orderBy: CompanyCategoryOrderByInput
  ) {
		allCompanyCategories(
      orderBy: $orderBy, 
      filter: $filter
    ) {
			id
			name
		}
	}
`);

// Search component: displays the list of companies in the database
class Search extends React.Component {

  state = {
    searchValue: '',
    searchedValue: '',
    orderBy: 'name_ASC',
    categories: '',
    karmas: [],
    reloaded: false,
  }

  constructor(props) {
    super(props)

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeKarma = this.handleChangeKarma.bind(this);
    this.clearFilters = this.clearFilters.bind(this);

    this.categories = [];
    this.karmas = []
    this.refetch = null
  }

  componentDidMount() {
    if (this.refetch) {
      this.refetch()
    }
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
    this.setState({ reloaded: true })
    this.setState({ categories: this.categories.join(',') });
  }

  clearFilters() {
    this.categories = [];
    this.karmas = []
    this.setState({ categories: '' })
    this.setState({ karmas: [] })
  }

  resetReload() {
    this.setState({ reloaded: false })
  }

  handleChangeKarma(event) {

    const targetValue = event.target.value;
    const index = this.state.karmas.indexOf(targetValue);
    const karmas = this.state.karmas;

    /*
    TODO
    if (index > -1) {
      karmas.splice(index, 1);
    } else {
      karmas.push(targetValue);
    }*/

    if (karmas.length) {
      karmas.splice(0, 1)
    }
    if (index === -1) {
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

  render() {

    const searchValue = this.state.searchValue;

    return (

      <Grid>

        {/* TITLE */}

        <Row mt={'96px'} alignItems="center">
          <Col xs={12} justifyContent="flex-start" md={8}>
            <h1 class="title-size1">{BRANDS_STATIC_CONTENTS.title['fr']}</h1>
          </Col>

          <Col xs={12} textAlign="right" md={4}>
            {(this.state.categories.length || this.state.karmas.length) ? (<BasicButton ghost onClick={this.clearFilters} >Supprimer les filtres x</BasicButton>) : ''}
          </Col>
        </Row>

        {/* FILTERS */}

        <Row className="brands-filtering" justifyContent="flex-start" mt={'2rem'}>
          <Col xs={12} md={7}>

            {/* Filters - categories list -- TODO : transform elements into components */}

            <h5>{BRANDS_STATIC_CONTENTS.filters_categories_title['fr']}</h5>

            <Query
              query={COMPANY_CATEGORY_LIST}
            >
              {
                ({ loading, error, data }) => {

                  if (loading) return <div> Fetching Categories</div>
                  if (error) return <div> Error while loading categories</div>

                  const companyCategoryList = data.allCompanyCategories

                  return (
                    <div className="filters">
                      <form>
                        {companyCategoryList.map(category => (

                          <PrettyCheckbox
                            key={'c-' + category.id}
                            label={category.name}
                            name="category"
                            checked={(this.state.categories.indexOf(category.id) > -1 && 'checked')}
                            value={category.id}
                            handleChange={this.handleChangeCategory.bind(this)}
                          />

                        ))}
                      </form>
                    </div>
                  )
                }
              }
            </Query>

          </Col>

          <Col xs={12} md={5}>

            {/* Filters - karmas list -- TODO : transform elements into components */}

            <h5>{BRANDS_STATIC_CONTENTS.filters_karmas_title['fr']}</h5>

            <form>
              {Object.entries(KARMA_LABELS).map(([k, karma], index) => (

                <PrettyCheckbox
                  className={'karma-pcb karma-' + karma.slug}
                  key={'k-' + karma.slug}
                  label={karma.value}
                  name="karma"
                  checked={(this.state.karmas.indexOf(karma.slug) > -1 && 'checked')}
                  value={karma.slug}
                  handleChange={this.handleChangeKarma.bind(this)}
                  title={karma.label['fr']}
                />

              ))}
            </form>

          </Col>
        </Row>

        {/* SEARCH AND SORT */}

        <Row className="brands-sorting" justifyContent="flex-start" mt={'3rem'}>

          <Col xs={12} md={7}>

            {/* Search input -- TODO : transform element into component */}
            <SearchInputForm onSubmit={this.handleSubmitSearch}>

              <SearchInput
                value={this.state.searchValue}
                onChange={this.handleChangeSearch}
                component={this.renderSearchInput}
                placeholder={BRANDS_STATIC_CONTENTS.search_input_placeholder['fr']}
              />

              {searchValue.length ? (<SearchInputClearButton onClick={this.clearSearchInput} >x</SearchInputClearButton>) : ''}

            </SearchInputForm>

          </Col>

          <Col xs={12} omd={1} md={4} className="sorter">

            <h5>{BRANDS_STATIC_CONTENTS.sorting_title['fr']}</h5>

            <Select
              options={BRANDS_SORTING_LABELS}
              handleChange={this.handleChangeOrderBy.bind(this)}
            />

          </Col>
        </Row>

        {/* RESULTS */}

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
      </Grid>
    )
  }
}

export default Search
