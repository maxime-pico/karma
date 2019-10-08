import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Count = styled.div`
	color: white;
	font-size: 0.7em;
	line-height: 1.2em;
	text-align: center;
	@media (max-width: 540px) {
		font-size: 1em;
	}
`

// query that retrieves the company overview from its id
const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			opinionsCount
			actGradesCount
			causeGradesCount
		}
	}
`
// Displays the grade count and opinion count of a company, receives
// companyId as a prop
class CompanyGradesCount extends React.Component {
	render() {
		const companyId = this.props.companyId
		return (
			<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const {
						opinionsCount,
						actGradesCount,
						causeGradesCount,
					} = data.companyOverview

					return (
						<Count>
							{causeGradesCount + actGradesCount} notes basées sur{' '}
							{opinionsCount} opinions
						</Count>
					)
				}}
			</Query>
		)
	}
}

export default CompanyGradesCount
