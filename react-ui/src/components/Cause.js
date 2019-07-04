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
// import CausesJudgingInterface from './CausesJudgingInterface'
// import GradeKarmaButton from './GradeKarmaButton'
// import CauseDescription from './CauseDescription'

// const CancelButton = styled.button`
// 	font-size: 1.5em;
// 	color: white;
// 	background-color: #c20e13;
// 	box-shadow: 3px 5px 18px #9c9c9c;
// 	border-radius: 30px;
// 	border: none;

// 	:hover,
// 	:focus:hover {
// 		box-shadow: 0px 0px 32px white;
// 		background-color: #fa7377;
// 		color: white;
// 	}
// `

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
						<div>
							<CauseHeader
								companyId={companyId}
								karma={overallKarma}
								type={'cause'}
								cause={cause}
								pb={0}
							/>
							{/*<Grid fluid>
								<KarmaBubbleAndSlider karma={overallKarma} type="global" />
							<OverviewList
								grades={causeGrades}
								type="cause"
								companyId={companyId}
								mode={cause}
							/>
							<CauseDescription cause={cause} />
							</Grid> */}
							{/*this.state.grading && (
								<CausesJudgingInterface
									companyId={companyId}
									cause={cause}
									grading={this.state.grading}
									userGrades={this.state.userGrades}
									_setGrade={this._setGrade}
									_adjacentCause={this._adjacentCause}
									_stopGrading={this._stopGrading}
								/>
							)*/}
							{/*<Row mb={4}>
								<Col>
									{this.state.grading ? (
										<CancelButton
											type="button"
											className="btn btn-danger"
											onClick={() => this._stopGrading()}
										>
											Annuler
										</CancelButton>
									) : (
										<GradeKarmaButton
											label="Attribuer du Karma"
											_startGrading={this._startGrading}
										/>
									)}
								</Col>
							</Row>*/}
							<ActAndOpinionPreviewList cause={cause} companyId={companyId} />
							<StartGradingCausesModal
								isOpen={this.state.modalIsOpen}
								_closeModal={this._closeModal}
							/>
							<LoginToGradeModal
								isOpen={this.state.loginToGradeModalIsOpen}
								_closeModal={this._closeLoginToGradeModal}
							/>
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Cause
