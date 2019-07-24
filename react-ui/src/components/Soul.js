import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SoulHeader from './SoulHeader'
/* import SoulExplanation from './SoulExplanation' */
import CauseCard from './CauseCard'
import LoginToGradeModal from './LoginToGradeModal'
import GradeKarmaButton from './GradeKarmaButton'
import SoulHelpInterface from './SoulHelpInterface'
import HelpButton from './HelpButton'
import { CAUSE_AND_ACTS, AUTH_TOKEN, SOUL_STEPS } from '../constants.js'
import Cookies from 'universal-cookie'
import { Steps } from 'intro.js-react'
import { Grid, Row, Col, Box, styled } from '@smooth-ui/core-sc'

const BlurOnModal = styled.div`
	filter: ${props => (props.blur ? 'blur(4px)' : null)};
`

const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQuery($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
			SOCIAL
			ETHICS
			FISCAL
			overallKarma
		}
	}
`
// Soul component: gets the current company from path and displays the list of
// corresponding causes and their grades
class Soul extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the tok
		this.userOnboarded = cookies.get('userOnboarded_soul') // if user has been onboarded contains the token
	}

	state = {
		grading: false,
		help: false,
		modalIsOpen: false,
		stepsEnabled: false,
		initialStep: 0,
		steps: SOUL_STEPS,
	}

	componentDidMount() {
		if (!this.userOnboarded) {
			this.setState(previousState => {
				previousState.stepsEnabled = true
				return previousState
			})
		}
	}

	_startGrading = () => {
		if (this.authToken) {
			this.props.history.push({
				pathname: `/company/${this.props.match.params.companyId}/cause/ENVIRONMENT/`,
				state: { startGrading: true },
			})
		} else {
			this.setState(previousState => {
				previousState.modalIsOpen = true
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

	_closeHelp = () => {
		this.setState(previousState => {
			previousState.help = false
			return previousState
		})
	}

	_openHelp = () => {
		this.setState(previousState => {
			previousState.help = true
			return previousState
		})
	}

	_launchTutorial = () => {
		this.setState(previousState => {
			previousState.stepsEnabled = true
			return previousState
		})
	}

	_endTutorial = () => {
		this.setState(previousState => {
			previousState.stepsEnabled = false
			return previousState
		})
		if (!this.userOnboarded) {
			const cookies = new Cookies()
			cookies.set('userOnboarded_soul', 'true', {
				path: '/',
			})
		}
	}

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
						<BlurOnModal blur={this.state.modalIsOpen}>
							<Steps
								enabled={this.state.stepsEnabled}
								steps={this.state.steps}
								initialStep={this.state.initialStep}
								onExit={this._endTutorial}
								options={{
									showStepNumbers: false,
									overlayOpacity: 0.01,
									showBullets: false,
									hidePrev: true,
									hideNext: true,
									nextLabel: 'Suivant',
									doneLabel: 'Terminé',
								}}
							/>
							<SoulHeader
								companyId={companyId}
								karma={overallKarma}
								type={'global'}
								causeGrades={causeGrades}
								pb={0}
							/>
							<Box pb={120}>
								<Grid>
									{/*<SoulExplanation />*/}
									<Row justifyContent="center">
										{Object.keys(causeGrades).map(
											(identifier, i) =>
												CAUSE_AND_ACTS[identifier] && (
													<Col key={i} md={10} mb="42px">
														<CauseCard
															companyId={companyId}
															causeKarma={causeGrades[identifier]}
															identifier={identifier}
															tutorial={i === 0}
														/>
													</Col>
												),
										)}
									</Row>
								</Grid>
							</Box>
							{this.state.help && (
								<SoulHelpInterface
									companyId={companyId}
									_closeHelp={this._closeHelp}
									_launchTutorial={this._launchTutorial}
									_endTutorial={this._endTutorial}
									stepsEnabled={this.state.stepsEnabled}
								/>
							)}
							<LoginToGradeModal
								isOpen={this.state.modalIsOpen}
								_closeModal={this._closeModal}
							/>
							<GradeKarmaButton _startGrading={this._startGrading} />
							<HelpButton _openHelp={this._openHelp} />
						</BlurOnModal>
					)
				}}
			</Query>
		)
	}
}

export default Soul
