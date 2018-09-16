import React from 'react'
import CauseCardTitle from './CauseCardTitle'
import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CauseCardActList from './CauseCardActList'
// import { CAUSE_AND_ACTS } from '../constants.js'
// import { convertGradesIntoWords } from '../utils'

const style = {
	border: '1pt solid black',
	'border-radius': '25px',
}

const ACT_GRADES_QUERIES = {
	ENVIRONMENT: gql`
		query EnvironmentGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				CLIMAT_CHANGE
				ECOSYSTEM_PRESERVATION
				RESOURCE_PRESERVATION
			}
		}
	`,
	ANIMALS: gql`
		query AnimalsGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				ANIMAL_EXPERIMENTATION
				ANIMAL_RESOURCES
				ANIMAL_WELFARE
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

const CauseCard = ({ companyId, causeKarma, identifier }) => {
	return (
		<div className="row m-4">
			<div className="col p-3" style={style}>
				<CauseCardTitle identifier={identifier} />
				<div className="row">
					<div className="col">
						<KarmaBubbleAndSlider karma={causeKarma} type="cause" />
					</div>
				</div>
				<Query query={ACT_GRADES_QUERIES[identifier]} variables={{ companyId }}>
					{({ loading, error, data }) => {
						if (loading) return <div> Fetching </div>
						if (error) return <div> Error </div>
						return (
							<CauseCardActList
								actGradesObject={data.companyActGrades}
								companyId={companyId}
							/>
						)
					}}
				</Query>
			</div>
		</div>
	)
}

export default CauseCard
