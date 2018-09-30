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
						<div className="container">
							<div className="row d-flex justify-content-center">
								<div className="col-6">
									<div className="row d-flex justify-content-center my-4">
										{companyList.map(company => (
											<div className="col-4" key={company.name}>
												<Link to={`/company/${company.id}`}>
													<div className="row">
														<div className="col text-center">
															<img
																src={
																	process.env.PUBLIC_URL +
																	'/images/' +
																	company.logo
																}
																width="60"
																height="60"
																alt="company"
															/>
														</div>
													</div>
													<div className="row">
														<div className="col text-center">
															{company.name}
														</div>
													</div>
												</Link>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Search
