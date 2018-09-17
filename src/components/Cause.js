//@flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OverviewList from './OverviewList'
import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'
import ActAndOpinionPreviewList from './ActAndOpinionPreviewList'

const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQuery($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
			ANIMALS
			SOCIAL
			ETHICS
			FISCAL
			overallKarma
		}
	}
`

// Cause component: gets the current cause and company from path and displays
// the list of corresponding acts and their grades
class Cause extends React.Component {
	render() {
		const companyId = this.props.match.params.companyId
		const cause = this.props.match.params.cause
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
						<div className="mb-5">
							<div className="container-fluid">
								<KarmaBubbleAndSlider karma={overallKarma} type="global" />
								<OverviewList
									grades={causeGrades}
									type="cause"
									companyId={companyId}
									mode={cause}
								/>
							</div>
							<ActAndOpinionPreviewList cause={cause} companyId={companyId} />
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Cause
