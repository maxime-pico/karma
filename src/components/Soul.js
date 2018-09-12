// @flow
import React from 'react'
// import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CompanyGrades from './CompanyGrades'

const COMPANY_NAME_QUERY = gql`
	query CompanyNameQuery($companyId: ID!) {
		company(companyId: $companyId) {
			name
		}
	}
`

const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQuery($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
			ANIMALS
			SOCIAL
			ETHICS
			FISCALITY
		}
	}
`
// Soul component: gets the current company from path and displays the list of
// corresponding causes and their grades
class Soul extends React.Component {
	render() {
		const companyId = this.props.match.params.companyId
		return (
			<Query query={COMPANY_NAME_QUERY} variables={{ companyId }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>

					const companyName = data.company.name
					return (
						<div>
							<div> {companyName} </div>
							<Query query={CAUSE_GRADES_QUERY} variables={{ companyId }}>
								{({ loading, error, data }) => {
									if (loading) return <div> Fetching </div>
									if (error) {
										return <div> Error: {error.message} </div>
									}

									const causeGrades = data.companyCauseGrades

									return <CompanyGrades grades={causeGrades} />
								}}
							</Query>
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Soul

//{CAUSE_AND_ACTS[cause].name_fr} : {causeGrades[cause]}
