import React from 'react'
import ActAndOpinionPreview from './ActAndOpinionPreview'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ACT_GRADES_QUERIES = {
	ENVIRONMENT: gql`
		query EnvironmentGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				CLIMAT_CHANGE
				ECOSYSTEM_PRESERVATION
				RESOURCE_PRESERVATION
				ANIMAL_CONDITION
			}
		}
	`,
	ETHICS: gql`
		query EthicsGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				POLITICAL_RESPONSIBILITY
				MARKET_INFLUENCE
				POPULATION_RESPECT
				CONSUMER_RESPECT
				QUESTIONABLE_INDUSTRIES
			}
		}
	`,
	FISCAL: gql`
		query FiscalGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				SHAREHOLDER_REMUNERATION
				TAXATION_LEVEL
				EXECUTIVE_COMPENSATION
				EMPLOYEE_EQUITY
			}
		}
	`,
	SOCIAL: gql`
		query SocialGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				EMPLOYMENT_CONDITIONS
				EMPLOYEE_DISCRIMINATIONS
				WORKING_CONDITIONS
				MANAGING_CONDITIONS
			}
		}
	`,
}

const ActAndOpinionPreviewList = ({ cause, companyId }) => (
	<div className="container">
		<Query query={ACT_GRADES_QUERIES[cause]} variables={{ companyId }}>
			{({ loading, error, data }) => {
				if (loading) return <div> Fetching </div>
				if (error) return <div> Error </div>

				const companyActGrades = data.companyActGrades
				return (
					<div style={{ backgroundColor: 'white' }}>
						{Object.keys(companyActGrades)
							.filter(identifier => identifier !== '__typename')
							.map(act => (
								<div className="row ml-4" key={act}>
									<div className="col">
										<ActAndOpinionPreview
											act={act}
											companyId={companyId}
											grade={companyActGrades[act]}
										/>
									</div>
								</div>
							))}
					</div>
				)
			}}
		</Query>
	</div>
)

export default ActAndOpinionPreviewList
