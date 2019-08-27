
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Grid, Row, Col, } from '@smooth-ui/core-sc'
import { KARMA_LABELS, BRANDS_SORTING_LABELS, BRANDS_RESULTS_MESSAGES, BRANDS_STATIC_CONTENTS } from '../../../utils'
import icon_magnifier from '../../../images/icons/loupe.svg'
import Select from './../../../components/form/Select'
import PrettyCheckbox from './../../../components/form/PrettyCheckbox'

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

class SearchFilters extends React.Component {

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

    this.handleChangeSearch = this.props.handleChangeSearch.bind(this)
    this.handleSubmitSearch = this.props.handleSubmitSearch.bind(this)
    this.clearSearchInput = this.props.clearSearchInput.bind(this)
    this.handleChangeOrderBy = this.props.handleChangeOrderBy.bind(this)
    this.handleChangeCategory = this.props.handleChangeCategory.bind(this)
    this.handleChangeKarma = this.props.handleChangeKarma.bind(this)
    this.clearFilters = this.props.clearFilters.bind(this)

    this.categories = this.props.categories;
    this.karmas = this.props.karmas
    this.refetch = null
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ categories: nextProps.categories })
    this.setState({ karmas: nextProps.karmas })
  }

  resetReload() {
    this.setState({ reloaded: false })
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
    return (
      <div>
        {/* FILTERS */}

        <Row className="brands-filtering" justifyContent="flex-start" mt={'2rem'}>
          <Col xs={12} md={7}>

            {/* Filters - categories list */}

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

            {/* Filters - karmas list */}

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

              {this.state.searchValue.length ? (<SearchInputClearButton onClick={this.clearSearchInput} >x</SearchInputClearButton>) : ''}

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

      </div>
    )
  }
}

export default SearchFilters