/* This Component fetches the Act grades for a given cause and calls the
components needed to display the Cause Card properly  */

// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CauseCardTitle from './CauseCardTitle'
import CauseCardActList from './CauseCardActList'
import { Row, Col, styled } from '@smooth-ui/core-sc'

//<STYLE>
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
//</STYLE>

// Preparing the queries for the 4 possible causes. These queries retrieve the
// grades for each act inside. Only one query will be sent in the end
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

// Prepares the Query that returns the number of opinions and grades contained
// in this cause
const OPINIONS_COUNT_QUERY = gql`
	query OpinionsAndGradesCauseCount($companyId: ID!, $identifier: Cause!) {
		opinionsAndGradesCauseCount(companyId: $companyId, cause: $identifier) {
			opinionsCount
			gradesCount
		}
	}
`

// Declare types of expected props
type Props = {
	companyId: string,
	causeKarma: number,
	identifier: string,
}

const CauseCard = (props: Props) => {
	const { companyId, causeKarma, identifier } = props
	return (
		<Row mt="126px" justifyContent="center">
			<CauseCardBorder md={10} py={3} pt={3} pb={0}>
				<CauseCardTitle
					companyId={companyId}
					identifier={identifier}
					causeKarma={causeKarma}
				/>
				<Query query={ACT_GRADES_QUERIES[identifier]} variables={{ companyId }}>
					{({ loading, error, data }) => {
						if (loading) return <div> Loading... </div>
						if (error) return <div> Error </div>

						// if fetch successful, then data is an object containing the object
						// companyActGrades with each grade per act for this cause
						return <CauseCardActList actGradesObject={data.companyActGrades} />
					}}
				</Query>
				<Row justifyContent="center" mt={3}>
					<Col md={3}>
						<Query
							query={OPINIONS_COUNT_QUERY}
							variables={{ companyId, identifier }}
						>
							{({ loading, error, data }) => {
								if (loading) return <div> Loading... </div>
								if (error) return <div> Error {console.log(error)}</div>

								// if successful, then data is split into the two counts and
								// displayed directly inside this component
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
