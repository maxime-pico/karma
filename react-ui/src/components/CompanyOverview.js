import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Row, Col } from '@smooth-ui/core-sc'

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
							<Row>
								<div>
									<div
										style={{
											height: '60px',
											width: '60px',
											borderRadius: '60px',
											overflow: 'hidden',
											marginLeft: '40px',
										}}
									>
										<span
											style={{
												display: 'inline-block',
												height: '100%',
												verticalAlign: 'middle',
											}}
										/>
										<img
											src={process.env.PUBLIC_URL + '/images/' + logo}
											width="60"
											alt="company"
										/>
									</div>
								</div>
								<div
									style={{
										textAlign: 'left',
										paddingLeft: '10px',
										color: 'black',
										fontWeight: '600',
										fontSize: '1.3em',
										lineHeight: '1.1em',
									}}
								>
									<div>{name}</div>
									<div>
										{causeGradesCount + actGradesCount}{' '}
										<span style={{ fontSize: '0.7em', fontWeight: '400' }}>
											notes
										</span>
									</div>
									<div>
										{opinionsCount}{' '}
										<span style={{ fontSize: '0.7em', fontWeight: '400' }}>
											opinions
										</span>
									</div>
								</div>
							</Row>
						</Link>
					)
				}}
			</Query>
		)
	}
}

export default CompanyOverview
