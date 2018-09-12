// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// query that retireves the list of all companies
const COMPANY_LIST = gql`
	query CompanyList {
		allCompanies {
			id
			name
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
						<div>
							{companyList.map(company => (
								<div key={company.name}>
									<Link to={`/company/${company.id}`}>{company.name}</Link>
								</div>
							))}
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Search
