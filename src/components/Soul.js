// @flow
import React from 'react'
// import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CompanyGrades from './CompanyGrades'
import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'

const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQuery($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
			ANIMALS
			SOCIAL
			ETHICS
			FISCALITY
			overallKarma
		}
	}
`
// Soul component: gets the current company from path and displays the list of
// corresponding causes and their grades
class Soul extends React.Component {
	render() {
		const companyId = this.props.match.params.companyId
		return (
			<Query query={CAUSE_GRADES_QUERY} variables={{ companyId }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) {
						return <div> Error: {error.message} </div>
					}

					const causeGrades = data.companyCauseGrades
					const overallKarma = causeGrades.overallKarma

					return (
						<div>
							<KarmaBubbleAndSlider karma={overallKarma} type="global" />
							<CompanyGrades grades={causeGrades} />
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Soul

//{CAUSE_AND_ACTS[cause].name_fr} : {causeGrades[cause]}
