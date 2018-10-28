import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OverviewList from './OverviewList'
import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'
import SoulExplanation from './SoulExplanation'
import CauseCard from './CauseCard'
import LoginToGradeModal from './LoginToGradeModal'
import { CAUSE_AND_ACTS, AUTH_TOKEN } from '../constants.js'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

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
	}

	state = {
		grading: false,
		modalIsOpen: false,
	}

	_startGrading = () => {
		if (this.authToken) {
			this.props.history.push({
				pathname: `/company/${
					this.props.match.params.companyId
				}/cause/ENVIRONMENT/`,
				state: { startGrading: true },
			})
		} else {
			this.setState(previousState => {
				previousState.modalIsOpen = true
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
						<div className="mb-5">
							<div className="container-fluid">
								<KarmaBubbleAndSlider karma={overallKarma} type="global" />
								<OverviewList
									grades={causeGrades}
									type="cause"
									companyId={companyId}
								/>
							</div>

							<div className="container">
								<SoulExplanation />
								<div className="row">
									<div className="col">
										<button
											type="button"
											className="btn btn-primary"
											onClick={() => this._startGrading()}
										>
											Attribuer du Karma
										</button>
									</div>
								</div>
								<div className="row d-flex justify-content-center">
									{Object.keys(causeGrades).map(
										identifier =>
											CAUSE_AND_ACTS[identifier] && (
												<div key={identifier} className="col-4">
													<Link
														to={`/company/${companyId}/cause/${identifier}`}
													>
														<CauseCard
															companyId={companyId}
															causeKarma={causeGrades[identifier]}
															identifier={identifier}
														/>
													</Link>
												</div>
											),
									)}
								</div>
							</div>
							<LoginToGradeModal
								isOpen={this.state.modalIsOpen}
								_closeModal={this._closeModal}
							/>
						</div>
					)
				}}
			</Query>
		)
	}
}

export default Soul
