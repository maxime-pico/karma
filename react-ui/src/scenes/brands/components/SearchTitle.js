/*
This page is available at /brands. This page displays the list of brands
available on the plateform. Later it will be used to also perform search,
filters and ordering on the companies.
 */

// @flow
import React from 'react'
import { Row, Col, } from '@smooth-ui/core-sc'
import { BRANDS_STATIC_CONTENTS } from '../../../utils'
import BasicButton from './../../../components/buttons/BasicButton'


class SearchTitle extends React.Component {
  state = {
    nbCategories: 0,
    nbKarmas: 0
  }

  constructor(props) {
    super(props)

    this.setState({ nbCategories: props.nbCategories })
    this.setState({ nbKarmas: props.nbKarmas })
    this.clearFilters = this.props.clearFilters.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ nbCategories: nextProps.nbCategories })
    this.setState({ nbKarmas: nextProps.nbKarmas })
  }

  render() {
    return (
      <Row mt={'96px'} alignItems="center">
        <Col xs={12} justifyContent="flex-start" md={8}>
          <h1 class="title-size1">{BRANDS_STATIC_CONTENTS.title['fr']}</h1>
        </Col>

        <Col xs={12} textAlign="right" md={4}>
          {(this.state.nbCategories || this.state.nbKarmas) ? (<BasicButton ghost onClick={this.clearFilters} >Supprimer les filtres x</BasicButton>) : ''}
        </Col>
      </Row>
    )
  }
}

export default SearchTitle