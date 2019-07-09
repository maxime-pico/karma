import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '../constants'
import { adjacentCause } from '../utils'
import CauseHeader from './CauseHeader'
// import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'
import ActAndOpinionPreviewList from './ActAndOpinionPreviewList'
import StartGradingCausesModal from './StartGradingCausesModal'
import LoginToGradeModal from './LoginToGradeModal'
import GradeKarmaButton from './GradeKarmaButton'
import CausesJudgingInterface from './CausesJudgingInterface'
// import GradeKarmaButton from './GradeKarmaButton'
// import CauseDescription from './CauseDescription'
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
	}

	state = {
		startGrading: false,
		grading: false,
		modalIsOpen: false,
		modalConfirmIsOpen: false,
		loginToGradeModalIsOpen: false,
		userGrades: {
			ENVIRONMENT: null,
			SOCIAL: null,
			ETHICS: null,
			FISCAL: null,
		},
	}

	_startGrading = () => {
		if (this.authToken) {
			this.props.history.push({
				pathname: `/company/${
					this.props.match.params.companyId
				}/cause/ENVIRONMENT/`,
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

	componentDidMount() {
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
							<CauseHeader
								companyId={companyId}
								karma={overallKarma}
								type={'cause'}
								cause={cause}
								pb={0}
								grading={this.state.grading}
							/>
							<ActAndOpinionPreviewList cause={cause} companyId={companyId} />
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
							<StartGradingCausesModal
								isOpen={this.state.modalIsOpen}
								_closeModalAndContinue={this._closeModalAndContinue}
							/>
							<LoginToGradeModal
								isOpen={this.state.loginToGradeModalIsOpen}
								_closeModal={this._closeLoginToGradeModal}
							/>
							<GradeKarmaButton _startGrading={this._startGrading} />
						</BlurOnModal>
					)
				}}
			</Query>
		)
	}
}

export default Cause
