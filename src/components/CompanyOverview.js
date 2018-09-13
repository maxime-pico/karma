import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

// query that retrieves the company overview from its id
const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
			logo
			opinionsCount
			actGradesCount
			causeGradesCount
		}
	}
`
// Displays the logo, name, grade count and opinion count of a company, receives
// companyId as a prop
class CompanyOverview extends React.Component {
	render() {
		const companyId = this.props.companyId
		return (
			<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const {
						name,
						logo,
						opinionsCount,
						actGradesCount,
						causeGradesCount,
					} = data.companyOverview

					return (
						<Link to={`/company/${companyId}`}>
							<table>
								<tbody>
									<tr>
										<td>
											<img
												src={process.env.PUBLIC_URL + '/images/' + logo}
												width="60"
												height="60"
												alt="company"
											/>
										</td>
										<td>
											<div>{name}</div>
											<div>{causeGradesCount + actGradesCount} notes</div>
											<div>{opinionsCount} opinions</div>
										</td>
									</tr>
								</tbody>
							</table>
						</Link>
					)
				}}
			</Query>
		)
	}
}

export default CompanyOverview
