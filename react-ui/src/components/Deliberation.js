import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import { adjacentAct } from '../utils'
import DeliberationHeader from './DeliberationHeader'
import ItemOverviewQuery from './ItemOverviewQuery'
import CauseAndActExplanation from './CauseAndActExplanation'
import ActsNavButtons from './ActsNavButtons'
import OpinionFeed from './OpinionFeed'
import ActJudgingInterface from './ActJudgingInterface'
import StartGradingActModal from './StartGradingActModal'
import LoginToGradeModal from './LoginToGradeModal'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Row, Col, Box, styled } from '@smooth-ui/core-sc'

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

const OPINION_FEED_QUERY = gql`
	query OpinionFeedQuery($companyId: ID!, $act: Act!) {
		opinionsFeed(companyId: $companyId, act: $act) {
			id
			createdAt
			title
			text
			regardingWhat
			tags
			sources
			writtenBy {
				name
				picture
			}
			affiliationsCount
		}
	}
`

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
class Deliberation extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
	}

	state = {
		startGrading: false,
		grading: false,
		modalIsOpen: false,
		loginToGradeModalIsOpen: false,
		affiliation: false,
	}

	_adjacentCause = direction => {
		const { companyId, cause, act } = this.props.match.params
		this.props.history.push({
			pathname: `/company/${companyId}/cause/${cause}/act/${adjacentAct(
				cause,
				act,
				direction,
			)}/`,
		})
	}

	_startGrading = () => {
		if (this.authToken) {
			this.setState(previousState => {
				if (!previousState.grading) {
					previousState.modalIsOpen = true
					previousState.grading = true
					window.scrollTo(0, 0)
				} else {
					previousState.grading = false
				}
				return previousState
			})
		} else {
			this.setState(previousState => {
				previousState.loginToGradeModalIsOpen = true
				window.scrollTo(0, 0)
				return previousState
			})
		}
	}

	_closeModal = () => {
		this.setState(previousState => {
			previousState.modalIsOpen = false
			return previousState
		})
	}

	_closeLoginToGradeModal = () => {
		this.setState(previousState => {
			previousState.loginToGradeModalIsOpen = false
			return previousState
		})
	}

	_selectOpinion = opinionId => {
		this.setState(previousState => {
			previousState.affiliation = opinionId
			return previousState
		})
	}

	render() {
		const { companyId, cause, act } = this.props.match.params
		const query = ACT_GRADES_QUERIES[cause]
		return (
			<Query query={query} variables={{ companyId, act }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const karma = data.companyActGrades[act]
					return (
						<Query query={OPINION_FEED_QUERY} variables={{ companyId, act }}>
							{({ loading, error, data }) => {
								if (loading) return <div> Fetching </div>
								if (error) return <div> Error </div>
								const opinionsFeed = data.opinionsFeed

								return (
									<Box>
										<DeliberationHeader
											companyId={companyId}
											karma={karma}
											type={'act'}
											cause={cause}
											act={act}
											opinionsFeed={opinionsFeed}
											pb={0}
										/>
										<Grid fluid mt={5} px={5} py={3}>
											{/*
					{this.state.grading && (
						<Row mt={4}>
							<Col>
								<ActJudgingInterface
									act={act}
									companyId={companyId}
									affiliation={this.state.affiliation}
								/>
							</Col>
						</Row>
					)}
					<Row mb={4}>
						<Col className="col">
							<GradeButton
								type="button"
								className={`btn btn-${
									this.state.grading ? 'danger' : 'primary'
								}`}
								onClick={() => this._startGrading()}
							>
								{this.state.grading ? 'Annuler' : "Juger l'acte"}
							</GradeButton>
						</Col>
					</Row>*/}
											<Row my={4}>
												<Col>
													{/*Filtres – Pour commmencer Chronologique ou Top affiliation*/}
												</Col>
											</Row>
											<Row my={2} justifyContent="center">
												<Col md={10}>
													<OpinionFeed
														act={act}
														companyId={companyId}
														grading={this.state.grading}
														affiliation={this.state.affiliation}
														opinionsFeed={opinionsFeed}
														_selectOpinion={this._selectOpinion}
													/>
												</Col>
											</Row>
											<StartGradingActModal
												isOpen={this.state.modalIsOpen}
												_closeModal={this._closeModal}
											/>
											<LoginToGradeModal
												isOpen={this.state.loginToGradeModalIsOpen}
												_closeModal={this._closeLoginToGradeModal}
											/>
										</Grid>
									</Box>
								)
							}}
						</Query>
					)
				}}
			</Query>
		)
	}
}

export default Deliberation
