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

// <STYLE>
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
// </STYLE>

// preparing query that retireves the list of id, name and logos of all companies
const COMPANY_LIST = gql`
	query CompanyList {
		allCompanies(orderBy: name_ASC) {
			id
			name
			logo
		}
	}
`

// Search component: displays the list of companies in the database, calls
// the SearchResult component on every item
const Search = () => {
	return (
		// First fetch the data
		<Query query={COMPANY_LIST}>
			{({ loading, error, data }) => {
				if (loading) return <div> Loading... </div>
				if (error) return <div> Error </div>

				// companyList is an Object that contains the result of the query: id,
				// name, logo of all companies, ordered by name
				const companyList = data.allCompanies

				//This maps each item in the object to a SearchResult component inside
				//the grid that has layed out
				return (
					<Grid>
						<Row justifyContent={{ md: 'center' }} mt={'96px'}>
							<Col md={8}>
								<Title>Les marques déjà sur Karma Panda :</Title>
								<Row my={4} justifyContent={{ md: 'center' }}>
									{companyList.map((company, i) => (
										<SearchResult
											key={i}
											name={company.name}
											id={company.id}
											logo={company.logo}
										/>
									))}
								</Row>
							</Col>
						</Row>
					</Grid>
				)
			}}
		</Query>
	)
}

export default Search
