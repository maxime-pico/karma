import React from 'react'
import CauseCardTitle from './CauseCardTitle'
/*import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'*/
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CauseCardActList from './CauseCardActList'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const CauseCardBorder = styled(Col)`
	border-radius: 96px;
	background-color: white;
`

const Count = styled.div`
	font-size: 12px;
	color: #a9b4cc;
`
const MoreButton = styled.button`
  background-color: #7F8799;
  height: 60px
  font-size: 18px;
  text-align: center;
  padding: 0 48px;
  margin: auto;
  margin-top: -80px;
  color: white;
  border-radius: 35px;
  position: relative;
  bottom: -30px;
  z-index: 2;
  cursor: pointer;
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

const OPINIONS_COUNT_QUERY = gql`
	query OpinionsAndGradesCauseCount($companyId: ID!, $identifier: Cause!) {
		opinionsAndGradesCauseCount(companyId: $companyId, cause: $identifier) {
			opinionsCount
			gradesCount
		}
	}
`

const CauseCard = ({ companyId, causeKarma, identifier }) => {
	return (
		<Row mt="126px" justifyContent="center">
			<CauseCardBorder md={10} py={3} pt={3} pb={0}>
				<CauseCardTitle
					companyId={companyId}
					identifier={identifier}
					causeKarma={causeKarma}
				/>
				{/*<div className="row">
					<div className="col">
						<KarmaBubbleAndSlider karma={causeKarma} type="cause" />
					</div>
				</div>*/}
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
				<Row justifyContent="center" mt={3}>
					<Col md={3}>
						<Query
							query={OPINIONS_COUNT_QUERY}
							variables={{ companyId, identifier }}
						>
							{({ loading, error, data }) => {
								if (loading) return <div> Fetching </div>
								if (error) return <div> Error {console.log(error)}</div>
								const opinionsCountInt =
									data.opinionsAndGradesCauseCount.opinionsCount
								const gradesCountInt =
									data.opinionsAndGradesCauseCount.gradesCount
								return (
									<Count>
										{gradesCountInt} notes basées sur
										{' ' + opinionsCountInt} opinion
										{opinionsCountInt > 1 && 's'}
									</Count>
								)
							}}
						</Query>
					</Col>
				</Row>
				<Row justifyContent="center">
					<Col md={4}>
						<Link to={`/company/${companyId}/cause/${identifier}`}>
							<MoreButton type="button">En savoir plus</MoreButton>
						</Link>
					</Col>
				</Row>
			</CauseCardBorder>
		</Row>
	)
}

export default CauseCard
