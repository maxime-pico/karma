import React from 'react'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '../constants'
import { adjacentAct } from '../utils'
import DeliberationHeader from './DeliberationHeader'
import OpinionFeed from './OpinionFeed'
import ActJudgingInterfaceForm from './ActJudgingInterfaceForm'
import ActJudgingAffiliationInterface from './ActJudgingAffiliationInterface'
import StartGradingActModal from './StartGradingActModal'
import LoginToGradeModal from './LoginToGradeModal'
import GradeKarmaButton from './GradeKarmaButton'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Row, Col, Box, styled } from '@smooth-ui/core-sc'

const BlurOnModal = styled(Box)`
	filter: ${props => props.blur};
	margin-bottom: ${props => props.marginbottom};
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
		step: 0,
		error: 0,
		modalIsOpen: false,
		loginToGradeModalIsOpen: false,
		affiliation: false,
		gradingType: null,
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
					previousState.clickedOutside = false
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

	_stopGrading = () => {
		this.setState(previousState => {
			previousState.startGrading = false
			previousState.grading = false
			previousState.step = 0
			previousState.error = 0
			previousState.modalIsOpen = false
			previousState.loginToGradeModalIsOpen = false
			previousState.affiliation = false
			previousState.gradingType = null
			return previousState
		})
	}

	_closeModal = next => {
		this.setState(previousState => {
			previousState.modalIsOpen = false
			previousState.grading = false
			previousState.startGrading = false
			previousState.loginToGradeModalIsOpen = false
			previousState.gradingType = null
			return previousState
		})
	}

	_gradingType = type => {
		this.setState(previousState => {
			previousState.modalIsOpen = false
			previousState.gradingType = type
			previousState.grading = true
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

	_nextStep = () => {
		if (this.state.affiliation) {
			this.setState(previousState => {
				previousState.error = false
				previousState.step = 1
				return previousState
			})
		} else {
			this.setState(previousState => {
				previousState.error = true
				return previousState
			})
		}
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
									<BlurOnModal
										blur={
											this.state.modalIsOpen || this.state.gradingType === 'new'
												? 'blur(4px)'
												: 'none'
										}
										marginbottom={this.state.grading ? '500px' : '96px'}
										grading={this.state.grading}
									>
										<DeliberationHeader
											companyId={companyId}
											karma={karma}
											type={'act'}
											cause={cause}
											act={act}
											opinionsFeed={opinionsFeed}
											pb={0}
											grading={this.state.grading}
										/>
										<Grid fluid mt={5} px={5} py={3}>
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
														step={this.state.step}
														_selectOpinion={this._selectOpinion}
													/>
												</Col>
											</Row>
											{this.state.gradingType === 'affiliation' &&
												this.state.grading && (
													<ActJudgingAffiliationInterface
														companyId={companyId}
														_closeModal={this._closeModal}
														_stopGrading={this._stopGrading}
														act={act}
														step={this.state.step}
														error={this.state.error}
														affiliation={this.state.affiliation}
														_nextStep={this._nextStep}
													/>
												)}
											<StartGradingActModal
												isOpen={this.state.modalIsOpen}
												_closeModal={this._closeModal}
												_gradingType={this._gradingType}
											/>
											<LoginToGradeModal
												isOpen={this.state.loginToGradeModalIsOpen}
												_closeModal={this._closeLoginToGradeModal}
											/>
											<ActJudgingInterfaceForm
												isOpen={
													this.state.gradingType === 'new' && this.state.grading
												}
												companyId={companyId}
												_closeModal={this._closeModal}
												act={act}
											/>
										</Grid>
										<GradeKarmaButton _startGrading={this._startGrading} />
									</BlurOnModal>
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
