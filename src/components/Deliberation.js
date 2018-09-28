import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import { adjacentAct } from '../utils'
import ItemOverviewQuery from './ItemOverviewQuery'
import CauseAndActExplanation from './CauseAndActExplanation'
import ActsNavButtons from './ActsNavButtons'
import OpinionFeed from './OpinionFeed'
import ActJudgingInterface from './ActJudgingInterface'
import StartGradingActModal from './StartGradingActModal'
import LoginToGradeModal from './LoginToGradeModal'

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
				previousState.modalIsOpen = true
				previousState.grading = !previousState.grading
				return previousState
			})
		} else {
			this.setState(previousState => {
				previousState.loginToGradeModalIsOpen = true
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
		return (
			<div className="m-5">
				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<Link to={`/company/${companyId}/cause/${cause}/`}>
								<ItemOverviewQuery
									big={false}
									type={'cause'}
									identifier={cause}
									companyId={companyId}
								/>
							</Link>
						</div>
					</div>
					<div className="row my-4">
						<div className="col">
							<ItemOverviewQuery
								big={true}
								type={'act'}
								identifier={act}
								cause={cause}
								companyId={companyId}
							/>
						</div>
					</div>
					<ActsNavButtons _adjacentCause={this._adjacentCause} />
				</div>

				<div className="container my-5">
					<CauseAndActExplanation identifier={act} />
					{this.state.grading && (
						<div className="row my-4">
							<div className="col">
								<ActJudgingInterface
									act={act}
									companyId={companyId}
									affiliation={this.state.affiliation}
								/>
							</div>
						</div>
					)}
					<div className="row my-4">
						<div className="col">
							<button
								type="button"
								className={`btn btn-${
									this.state.grading ? 'danger' : 'primary'
								}`}
								onClick={() => this._startGrading()}
							>
								{this.state.grading ? 'Annuler' : "Juger l'acte"}
							</button>
						</div>
					</div>
					<div className="row my-4">
						<div className="col my-3">
							{/*Filtres – Pour commmencer Chronologique ou Top affiliation*/}
						</div>
					</div>
					<div className="row my-5">
						<div className="col">
							<OpinionFeed
								act={act}
								companyId={companyId}
								grading={this.state.grading}
								affiliation={this.state.affiliation}
								_selectOpinion={this._selectOpinion}
							/>
						</div>
					</div>
					<StartGradingActModal
						isOpen={this.state.modalIsOpen}
						_closeModal={this._closeModal}
					/>
					<LoginToGradeModal
						isOpen={this.state.loginToGradeModalIsOpen}
						_closeModal={this._closeLoginToGradeModal}
					/>
				</div>
			</div>
		)
	}
}

export default Deliberation
