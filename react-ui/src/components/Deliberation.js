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
import { Grid, Row, Col, Box, styled } from '@smooth-ui/core-sc'

const GradeButton = styled.button`
	font-size: 2em;
	color: #989898;
	background-color: white;
	box-shadow: 0px 0px 32px #ada9a98c;
	border-radius: 30px;
	border: none;

	:hover {
		background: linear-gradient(
			to right,
			#85d8e6,
			#b3d7f2 22.14%,
			#baacd4 41.51%,
			#af8cc0 56.2%,
			#d02417 98.46%,
			#d02417
		);
	}

	&.btn-danger {
		font-size: 1.5em;
		color: white;
		background-color: #c20e13;
		box-shadow: 3px 5px 18px #9c9c9c;
		border-radius: 30px;
		border: none;

		:hover,
		:focus:hover {
			box-shadow: 0px 0px 32px white;
			background: #fa7377;
			color: white;
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
		return (
			<Box mx={5}>
				<Grid fluid>
					<Row>
						<Col mb={1}>
							<Link to={`/company/${companyId}/cause/${cause}/`}>
								<ItemOverviewQuery
									big={false}
									type={'cause'}
									identifier={cause}
									companyId={companyId}
								/>
							</Link>
						</Col>
					</Row>
					<Row md={4}>
						<Col>
							<ItemOverviewQuery
								big={true}
								type={'act'}
								identifier={act}
								cause={cause}
								companyId={companyId}
							/>
						</Col>
					</Row>
					<ActsNavButtons _adjacentCause={this._adjacentCause} />
				</Grid>

				<Grid my={5}>
					<CauseAndActExplanation identifier={act} color="white" />
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
					</Row>
					<Row my={4}>
						<Col my={3}>
							{/*Filtres – Pour commmencer Chronologique ou Top affiliation*/}
						</Col>
					</Row>
					<Row my={5}>
						<Col>
							<OpinionFeed
								act={act}
								companyId={companyId}
								grading={this.state.grading}
								affiliation={this.state.affiliation}
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
	}
}

export default Deliberation
