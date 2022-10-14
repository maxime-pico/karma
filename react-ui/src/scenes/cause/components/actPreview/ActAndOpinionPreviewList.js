import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ActAndOpinionPreview from './ActAndOpinionPreview'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

const ACT_GRADES_QUERIES = {
	ENVIRONMENT: gql`
		query EnvironmentGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				CLIMATE_CHANGE
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

const ActAndOpinionPreviewList = ({
	cause,
	companyId,
	_launchTutorial,
	_dataLoaded,
}) => (
	<Grid fluid px={{ md: '80px' }} pt={40}>
		<Query
			query={ACT_GRADES_QUERIES[cause]}
			variables={{ companyId }}
			onCompleted={_dataLoaded}
		>
			{({ loading, error, data }) => {
				if (loading) return <div> Fetching </div>
				if (error) return <div> Error </div>
				const companyActGrades = data.companyActGrades
				return (
					<div>
						{companyActGrades &&
							Object.keys(companyActGrades)
								.filter(identifier => identifier !== '__typename')
								.map((act, i) => (
									<Row mt={'96px'} key={i} justifyContent="center">
										<Col xs={12} md={10} mb="42px">
											<ActAndOpinionPreview
												act={act}
												companyId={companyId}
												grade={companyActGrades[act]}
												tutorial={i === 0}
												_dataLoaded={_dataLoaded}
											/>
										</Col>
									</Row>
								))}
					</div>
				)
			}}
		</Query>
	</Grid>
)

export default ActAndOpinionPreviewList
