import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN, CAUSE_STEPS } from '../constants'
import { adjacentCause } from '../utils'
import CauseHeader from './CauseHeader'
import ActAndOpinionPreviewList from './ActAndOpinionPreviewList'
import StartGradingCausesModal from './StartGradingCausesModal'
import LoginToGradeModal from './LoginToGradeModal'
import GradeKarmaButton from './GradeKarmaButton'
import HelpButton from './HelpButton'
import CausesJudgingInterface from './CausesJudgingInterface'
import CauseHelpInterface from './CauseHelpInterface'
import { Steps } from 'intro.js-react'
import { styled } from '@smooth-ui/core-sc'

const BlurOnModal = styled.div`
	filter: ${props => props.blur};
	margin-bottom: ${props => (props.grading ? '500' : '96')}px;
`

const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQuery($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
		}
	}
`

// Cause component: gets the current cause and company from path and displays
// the list of corresponding acts and their grades
class Cause extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
		this.userOnboarded = cookies.get('userOnboarded_cause') // if user has been onboarded, is set at true, otherwise shouldn't exist
	}

	state = {
		startGrading: false,
		grading: false,
		modalIsOpen: false,
		modalConfirmIsOpen: false,
		loginToGradeModalIsOpen: false,
		help: false,
		userGrades: {
			ENVIRONMENT: null,
			SOCIAL: null,
			ETHICS: null,
			FISCAL: null,
		},
		stepsEnabled: false, // when switched to true, launches the tutorial
		initialStep: 0,
		steps: CAUSE_STEPS, // references to the file containing the different 'steps' of the tutorial, ie. text content and dom reference (class of the element)
	}

	/*
    >>>>>>>>>>>>>>> HELP <<<<<<<<<<<<<<<<<<<<<<<<<<
    The context:
    I use intro.js-react to have an interactive tutorial on the page.
    I would like the tutorial to launch automatically upon first visit of the page for a user.
    I achieved this well thanks to cookies.

    The problem:
    Unfortunantely on this page it doesn't work as expected because the tutorial triggers faster
    than my browser loads the DOM elements of the page. Therefore intro.js cannot locate the elements
    to annotate :(

    Attempted solutions:
    I tried using component did mount or even component did update + checking if all elements exist,
    but somehow it didn't work. I'm not the most skillful in react so it might be that.

    Additional infos:
    The tutorial data is contained in CAUSE_STEPS. It has 5 steps with references to 5 classes that
    target elements loaded by different components:
    - .karma & .actsList reference stuff in the CauseHeader component. actsLists is wrapped in a query fetching info, this is the first reference that breaks
    - .act & .more reference to elements in the ActAndOpinionPreview component
    - .opinion refrences to an element in the OpinionPreview component
  */

	componentDidMount() {
		if (!this.userOnboarded) {
			this.setState(previousState => {
				previousState.stepsEnabled = true // checking if the tutorial should be displayed for the user
				return previousState
			})
		}
		if (this.props.location.state) {
			if (this.props.location.state.startGrading && !this.state.startGrading) {
				this._startGrading()
				window.scrollTo(0, 0)
			}
			if (this.props.location.state.grading) {
				this.setState(previousState => {
					previousState.userGrades = this.props.location.state.userGrades
					return previousState
				})
			}
		}
	}

	_startGrading = () => {
		if (this.authToken) {
			this.props.history.push({
				pathname: `/company/${this.props.match.params.companyId}/cause/ENVIRONMENT/`,
			})
			this.setState(previousState => {
				previousState.grading = true
				previousState.startGrading = true
				previousState.modalIsOpen = true
				window.scrollTo(0, 0)
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

	_stopGrading = reload => {
		this.setState(previousState => {
			previousState.grading = false
			return previousState
		})
		reload && window.location.reload()
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

	_blurBackground = blur => {
		this.setState(previousState => {
			previousState.modalConfirmIsOpen = blur
			return previousState
		})
	}

	_closeModalAndContinue = next => {
		this.setState(previousState => {
			previousState.modalIsOpen = false
			previousState.grading = next
			previousState.startGrading = next
			return previousState
		})
	}

	_closeLoginToGradeModal = () => {
		this.setState(previousState => {
			previousState.loginToGradeModalIsOpen = false
			return previousState
		})
	}

	_setGrade = (cause, userGrade) => {
		this.setState(previousState => {
			previousState.userGrades[cause] = userGrade
			return previousState
		})
	}

	_adjacentCause = direction => {
		const rootUrl = this.props.match.url.match(/(.*)\/cause\//)[0]
		const cause = this.props.match.params.cause
		this.props.history.push({
			pathname: rootUrl + `${adjacentCause(cause, direction)}/`,
			state: {
				userGrades: this.state.userGrades,
				grading: true,
			},
		})
	}

	_launchTutorial = () => {
		// function used in CauseHelpInterface to manually launch the tutorial
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
			cookies.set('userOnboarded_cause', 'true', {
				path: '/',
			})
		}
	}

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
					const overallKarma = causeGrades.ENVIRONMENT

					return (
						<BlurOnModal
							blur={
								this.state.modalIsOpen || this.state.modalConfirmIsOpen
									? 'blur(4px)'
									: 'none'
							}
							grading={this.state.grading}
						>
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
							<CauseHeader
								companyId={companyId}
								karma={overallKarma}
								type={'cause'}
								cause={cause}
								pb={0}
								grading={this.state.grading}
								_launchTutorial={this._launchTutorial}
								_setDataLoaded={this._setDataLoaded}
							/>
							<ActAndOpinionPreviewList
								cause={cause}
								companyId={companyId}
								_setDataLoaded={this._setDataLoaded}
							/>
							{this.state.grading && (
								<CausesJudgingInterface
									companyId={companyId}
									cause={cause}
									userGrades={this.state.userGrades}
									_blurBackground={this._blurBackground}
									_setGrade={this._setGrade}
									_adjacentCause={this._adjacentCause}
									_stopGrading={this._stopGrading}
								/>
							)}
							{this.state.help && (
								<CauseHelpInterface
									companyId={companyId}
									_closeHelp={this._closeHelp}
									cause={cause}
									_launchTutorial={this._launchTutorial}
									_endTutorial={this._endTutorial}
									stepsEnabled={this.state.stepsEnabled}
								/>
							)}
							<StartGradingCausesModal
								isOpen={this.state.modalIsOpen}
								_closeModalAndContinue={this._closeModalAndContinue}
							/>
							<LoginToGradeModal
								isOpen={this.state.loginToGradeModalIsOpen}
								_closeModal={this._closeLoginToGradeModal}
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

export default Cause
