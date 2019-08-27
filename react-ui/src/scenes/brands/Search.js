/*
This page is available at /brands. This page displays the list of brands
available on the plateform. Later it will be used to also perform search,
filters and ordering on the companies.
 */

// @flow
import React from 'react'
import { Grid } from '@smooth-ui/core-sc'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import SearchTitle from './components/SearchTitle'
import SearchSuggested from './components/SearchSuggested'

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

    if (karmas.length) {
      karmas.splice(0, 1)
    }
    if (index === -1) {
      karmas.push(targetValue);
    }
    this.setState({ karmas: karmas });
  }

  /* Render view */
  render() {
    return (
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
        />

        {/* RESULTS */}
        <SearchResults
          searchedValue={this.state.searchValue}
          orderBy={this.state.orderBy}
          categories={this.state.categories}
          karmas={this.state.karmas}
        />

        {/* SUGGESTIONS */}
        <SearchSuggested />

      </Grid>
    )
  }
}

export default Search
