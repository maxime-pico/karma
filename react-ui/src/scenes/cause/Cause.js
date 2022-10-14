/* This page is available at /company/{companyID}/cause/{CAUSE} it is the parent component for
the page and calls all other components */

import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Cookies from 'universal-cookie'
import { Steps } from 'intro.js-react'
import CauseHeader from './components/header/CauseHeader'
import ActAndOpinionPreviewList from './components/actPreview/ActAndOpinionPreviewList'
import StartGradingCausesModal from './components/modals/StartGradingCausesModal'
import LoginToGradeModal from '../../components/modals/LoginToGradeModal'
import GradeKarmaButton from '../../components/buttons/GradeKarmaButton'
import HelpButton from '../../components/buttons/HelpButton'
import CausesJudgingInterface from './components/judgingInterface/CausesJudgingInterface'
import CauseHelpInterface from './components/helpInterface/CauseHelpInterface'
import { adjacentCause } from '../../services/utils'
import { AUTH_TOKEN, CAUSE_STEPS } from '../../services/constants'
import { styled } from '@smooth-ui/core-sc'

// <STYLE>
const BlurOnModal = styled.div`
	filter: ${props => props.blur};
	margin-bottom: ${props => (props.grading ? '500' : '96')}px;
`
// </STYLE>

// Preparing query that retireves the list of grades for the 4 causes
const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQuerySoul($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
			SOCIAL
			ETHICS
			FISCAL
		}
	}
`

// Cause component: gets the current cause and company from path and displays
// the list of corresponding acts and their grades by calling children components
class Cause extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
		this.userOnboarded = cookies.get('userOnboarded_cause') // if user has been onboarded, is set at true, otherwise shouldn't exist
		this.refetch = null
	}

	state = {
		startGrading: false, //If true triggers the start of the grading scenario. Useful when coming from Soul component
		grading: false, //Opens the grading interface
		modalIsOpen: false, //If true then displays StartGradingCausesModal
		modalConfirmIsOpen: false, //If true then means ConfirmGradesModal is displayed and background should be blurred
		loginToGradeModalIsOpen: false, //If true then LoginToGradeModal is displayed
		help: false, //If true then CauseHelpInterface is displayed
		userGrades: {
			//contains the user grades as he grades the different causes
			ENVIRONMENT: null,
			SOCIAL: null,
			ETHICS: null,
			FISCAL: null,
		},
		stepsEnabled: false, // when switched to true, launches the tutorial
		initialStep: 0,
		steps: CAUSE_STEPS, // references to the file containing the different 'steps' of the tutorial, ie. text content and dom reference (class of the element)
		stepDatasLoading: 0,
	}

	/*
    >>>>>>>>>>>>>>> HELP NEEDED (SOLVED) <<<<<<<<<<<<<<<<<<<<<<<<<<
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
    I tried not having different structures between query loading states and actual data provided but it
    didn't change anything...
    Current patch is to set a timeout but it doesn't work on "slow 3G" for instance

    Additional infos:
    The tutorial data is contained in CAUSE_STEPS. It has 5 steps with references to 5 classes that
    target elements loaded by different components:
    - .karma & .actsList reference stuff in the CauseHeader component. actsLists is wrapped in a query fetching info, this is the first reference that breaks
    - .act & .more reference to elements in the ActAndOpinionPreview component
    - .opinion refrences to an element in the OpinionPreview component

    >>>>>>>>>>>>>>> SOLUTION <<<<<<<<<<<<<<<<<<<<<<<<<<

    Instead of using timer we use "onComplete" Apollo's event handler in sub components queries 

  */

	//upon loading of the page, check if comming from Soul page or another cause page
	//in grading mode. If so, then copy location state into component state
	componentDidMount() {
		//if location state exists = context of the route is defined, then...
		if (this.props.location.state) {
			//if startGrading = true and startGrading not true for component, that means
			//we come from the Soul component
			if (this.props.location.state.startGrading && !this.state.startGrading) {
				this._startGrading()
				window.scrollTo(0, 0)
			}
			//if grading is at true, that means we come from another cause component
			if (this.props.location.state.grading) {
				this.setState(previousState => {
					previousState.userGrades = this.props.location.state.userGrades
					return previousState
				})
			}
		}
	}

	//event handler to start grading process
	_startGrading = () => {
		if (this.authToken) {
			//if user logged in then send him back to first cause with grading activated
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
			//otherwise ask for login
			this.setState(previousState => {
				previousState.loginToGradeModalIsOpen = true
				window.scrollTo(0, 0)
				return previousState
			})
		}
	}

	//event handler to stop the grading process
	_stopGrading = reload => {
		this.setState(previousState => {
			previousState.grading = false
			previousState.modalConfirmIsOpen = false
			return previousState
		})
		//reload && window.location.reload()
	}

	//event handler to close the help interface
	_closeHelp = () => {
		this.setState(previousState => {
			previousState.help = false
			return previousState
		})
	}

	//event handler to open the help interface
	_openHelp = () => {
		this.setState(previousState => {
			previousState.help = true
			return previousState
		})
	}

	//event handler to blur/unblur the background (blur is a boolean here)
	_blurBackground = blur => {
		this.setState(previousState => {
			previousState.modalConfirmIsOpen = blur
			return previousState
		})
	}

	//event handler that gets the response of the user to the questions in the
	//StartGradingCausesModal: "Are you sure you want to grade?" if yes then
	//next = true and we close the modal and start grading, if not we close and stop
	_closeModalAndContinue = next => {
		this.setState(previousState => {
			previousState.modalIsOpen = false
			previousState.grading = next
			previousState.startGrading = next
			return previousState
		})
	}

	//event handler for closing the LoginToGradeModal
	_closeLoginToGradeModal = () => {
		this.setState(previousState => {
			previousState.loginToGradeModalIsOpen = false
			return previousState
		})
	}

	//event handler that makes sure the state of this component always matches
	//with the grade the user is currently picking (in particular via the
	//PandaSlider in CausesJudgingInterfaceButton)
	//Cause is the identifier of the cause (a string, ex: ENVIRONMENT) and userGrade
	//is the new grade to match for that cause
	_setGrade = (cause, userGrade) => {
		this.setState(previousState => {
			previousState.userGrades[cause] = userGrade
			return previousState
		})
	}

	//event handler for the Next/Previous cause button in the
	//CausesJudgingInterfaceButtons component. If direction = -1 the we send the
	//user to the "previous" cause in grading mode, if +1, then to the next
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

	_subComponentsDataLoaded = () => {
		this.setState(previousState => {
			previousState.stepDatasLoading += 1
			return previousState
		})
		this.domLoaded()
	}

	domLoaded = () => {
		if (!this.userOnboarded) {
			if (this.state.stepDatasLoading === 2) {
				this.setState(previousState => {
					previousState.stepsEnabled = true // checking if the tutorial should be displayed for the user
					return previousState
				})
			}
		}
	}

	render() {
		const companyId = this.props.match.params.companyId //getting the companyId from url
		const cause = this.props.match.params.cause //getting the cause from url

		return (
			// Query to fetch the Cause karma for the brand
			<Query query={CAUSE_GRADES_QUERY} variables={{ companyId }}>
				{({ loading, error, data, refetch }) => {
					if (loading) return <div> Loading... </div>
					if (error) {
						return <div> Error: {error.message} </div>
					}

					const causeGrades = data.companyCauseGrades
					const overallKarma = causeGrades[cause]

					return (
						<BlurOnModal
							blur={
								this.state.modalIsOpen || this.state.modalConfirmIsOpen
									? 'blur(4px)'
									: 'none'
							}
							grading={this.state.grading}
						>
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
								userOnboarded={this.userOnboarded}
								stepsEnabled={this.stepsEnabled}
								_setDataLoaded={this._setDataLoaded}
								_launchTutorial={this._launchTutorial}
								_dataLoaded={this._subComponentsDataLoaded.bind(this)}
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
						</BlurOnModal>
					)
				}}
			</Query>
		)
	}
}

export default Cause
