import React from 'react'
import CauseCardTitle from './CauseCardTitle'
import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CauseCardActList from './CauseCardActList'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const CauseCardBorder = styled(Col)`
	box-shadow: 7px 16px 32px #d4d4d48c
	border-radius: 70px;
`

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

const CauseCard = ({ companyId, causeKarma, identifier }) => {
	return (
		<Row m={4} justifyContent="center">
			<CauseCardBorder md={12} p={3}>
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
			</CauseCardBorder>
		</Row>
	)
}

export default CauseCard
