import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SoulHeader from './SoulHeader'
/* import SoulExplanation from './SoulExplanation' */
import CauseCard from './CauseCard'
import LoginToGradeModal from './LoginToGradeModal'
import GradeKarmaButton from './GradeKarmaButton'
import { CAUSE_AND_ACTS, AUTH_TOKEN } from '../constants.js'
import Cookies from 'universal-cookie'
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
											identifier =>
												CAUSE_AND_ACTS[identifier] && (
													<Col key={identifier} md={10} mb="42px">
														<CauseCard
															companyId={companyId}
															causeKarma={causeGrades[identifier]}
															identifier={identifier}
														/>
													</Col>
												),
										)}
									</Row>
								</Grid>
							</Box>
							<LoginToGradeModal
								isOpen={this.state.modalIsOpen}
								_closeModal={this._closeModal}
							/>
							<GradeKarmaButton _startGrading={this._startGrading} />
						</BlurOnModal>
					)
				}}
			</Query>
		)
	}
}

export default Soul
