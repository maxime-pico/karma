// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SearchResult from './SearchResult'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

// query that retireves the list of all companies
const COMPANY_LIST = gql`
	query CompanyList {
		allCompanies {
			id
			name
			logo
		}
	}
`

// Search component: displays the list of companies in the database
class Search extends React.Component {
	render() {
		return (
			<Query query={COMPANY_LIST}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>

					const companyList = data.allCompanies

					return (
						<Grid>
							<Row justifyContent={{ md: 'center' }}>
								<Col md={6}>
									<Row my={4} justifyContent={{ md: 'center' }}>
										{companyList.map(company => (
											<SearchResult
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
}

export default Search
