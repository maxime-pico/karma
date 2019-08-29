/*
This page is available at /brands. This page displays the list of brands
available on the plateform. Later it will be used to also perform search,
filters and ordering on the companies.
 */

// @flow
import React from 'react'
import Cookies from 'universal-cookie'
import { Grid } from '@smooth-ui/core-sc'
import styled from 'styled-components'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import SearchTitle from './components/SearchTitle'
import SearchSuggested from './components/SearchSuggested'
import SuggestBrandModal from './components/SuggestBrandModal'
import LoginToSuggestModal from './../../components/modals/LoginToSuggestModal'

import { AUTH_TOKEN } from './../../services/constants'

const Suggestions = styled.div`
background-color: white;
padding: 8rem 0 8rem 0;
`

// Search component: displays the list of companies in the database
class Search extends React.Component {

  state = {
    searchValue: '',
    searchedValue: '',
    orderBy: 'karma_DESC',
    categories: '',
    karmas: [],
    reloaded: false,
    suggestModalIsOpen: false,
    loginToSuggestModalIsOpen: false
  }

  constructor(props) {
    super(props)

    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.clearSearchInput = this.clearSearchInput.bind(this)
    this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleChangeKarma = this.handleChangeKarma.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.renderSearchInput = this.renderSearchInput.bind(this)
    this._suggestBrand = this._suggestBrand.bind(this)

    this.categories = []
    this.karmas = []

    const cookies = new Cookies() // get access to cookies
    this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
    this.userOnboarded = cookies.get('userOnboarded_deliberation') // if user has been onboarded contains the token
  }

  /* Searching */

  clearSearchInput() {
    this.setState({ searchedValue: '' });
    this.setState({ searchValue: '' });
  }

  handleChangeSearch(event) {
    this.setState({ searchedValue: event.target.value });
    this.setState({ searchValue: event.target.value });
  }

  handleSubmitSearch(event) {
    event.preventDefault();
    this.setState({ searchedValue: this.state.searchValue });
  }

  /* Sorting */

  handleChangeOrderBy(event) {
    this.setState({ orderBy: event.target.value });
  }

  /* Filtering */

  clearFilters() {
    this.categories = [];
    this.karmas = []
    this.setState({ categories: '' })
    this.setState({ karmas: [] })
  }

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

  handleChangeKarma(event) {
    const targetValue = event.target.value;
    const index = this.state.karmas.indexOf(targetValue);
    const karmas = this.state.karmas;

    if (karmas.length) {
      karmas.splice(0, 1)
    }
    if (index === -1) {
      karmas.push(targetValue);
    }
    this.setState({ karmas: karmas });
  }

  renderSearchInput({ input, meta }) {
    return (
      <div>
        <input type="text" />
      </div>
    )
  }

  /* Suggestion */

  _suggestBrand() {

    console.log('SUGGEST MODAL')
    if (this.authToken) {
      this.setState(previousState => {
        previousState.suggestModalIsOpen = true
        previousState.loginToSuggestModalIsOpen = false
        return previousState
      })
    } else {
      this.setState(previousState => {
        previousState.loginToSuggestModalIsOpen = true
        window.scrollTo(0, 0)
        return previousState
      })
    }
  }

  _closeLoginToSuggestModal = () => {
    this.setState(previousState => {
      previousState.loginToSuggestModalIsOpen = false
      return previousState
    })
  }

  _closeSuggestModal = () => {
    this.setState(previousState => {
      previousState.suggestModalIsOpen = false
      return previousState
    })
  }

  /* Other */

  resetReload() {
    this.setState({ reloaded: false })
  }

  /* Render view */
  render() {
    return (
      <div>
        <Grid>

          {/* TITLE */}
          <SearchTitle
            nbCategories={this.state.categories.length}
            nbKarmas={this.state.karmas.length}
            clearFilters={this.clearFilters}
          />

          {/* FILTERS */}
          <SearchFilters
            handleChangeSearch={this.handleChangeSearch}
            handleSubmitSearch={this.handleSubmitSearch}
            clearSearchInput={this.clearSearchInput}
            handleChangeOrderBy={this.handleChangeOrderBy}
            handleChangeCategory={this.handleChangeCategory}
            handleChangeKarma={this.handleChangeKarma}
            clearFilters={this.clearFilters}
            categories={this.state.categories}
            karmas={this.state.karmas}
            renderSearchInput={this.renderSearchInput}
            searchValue={this.state.searchValue}
            orderBy={this.state.orderBy}
          />

          {/* RESULTS */}
          <SearchResults
            searchedValue={this.state.searchValue}
            orderBy={this.state.orderBy}
            categories={this.state.categories}
            karmas={this.state.karmas}
          />
        </Grid>

        <Suggestions>
          <Grid>
            {/* SUGGESTIONS */}
            <SearchSuggested suggestBrand={this._suggestBrand} />
          </Grid>
        </Suggestions>

        <SuggestBrandModal closeModal={this._closeSuggestModal} isOpen={this.state.suggestModalIsOpen} />
        <LoginToSuggestModal isOpen={this.state.loginToSuggestModalIsOpen} />


      </div>
    )
  }
}

export default Search
