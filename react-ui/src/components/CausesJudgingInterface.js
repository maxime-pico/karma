import React from 'react'
import { convertGradesIntoWords } from '../utils'
import PandaSlider from './PandaSlider'
import CausesJudgingInterfaceButtons from './CausesJudgingInterfaceButtons'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const JudgingInterface = styled.div`
	color: white;
	font-size: 1.3em;
	font-weight: 600;
`

const GRADING_MUTATION = gql`
	mutation GradingMutation($companyId: ID!, $userGrades: [Int!]!) {
		gradeCauses(companyId: $companyId, userGrades: $userGrades) {
			id
		}
	}
`

class CausesJudgingInterface extends React.Component {
	constructor(props) {
		super(props)
		this._setGrade = this.props._setGrade
		this._adjacentCause = this.props._adjacentCause
		this._stopGrading = this.props._stopGrading
	}

	state = {
		grade: 0,
		cause: this.props.cause,
	}

	static getDerivedStateFromProps(props, state) {
		if (props.cause !== state.cause) {
			return {
				grade: state.grade,
				cause: props.cause,
			}
		}
		return null
	}

	_updateGrade = grade => {
		this.setState(previousState => {
			previousState.grade = grade
			return previousState
		})
	}

	_intoArray = causeGradesObject => {
		if (causeGradesObject) {
			return Object.keys(causeGradesObject).map(
				cause => causeGradesObject[cause],
			)
		}
		return null
	}

	componentDidMount() {
		this._setGrade(this.props.cause, this.state.grade)
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.cause !== prevProps.cause) {
			this._setGrade(this.props.cause, this.state.grade)
		}
	}

	render() {
		const { cause, companyId, userGrades } = this.props

		return (
			<JudgingInterface>
				<Row>
					<Col>{this.state.grade}</Col>
				</Row>
				<Row>
					<Col>{convertGradesIntoWords(this.state.grade, 'cause').fr}</Col>
				</Row>
				<Row justifyContent="center" m={2}>
					<Col md={3}>
						<PandaSlider
							cause={cause}
							karma={this.state.grade}
							type={'global'}
							disabled={false}
							_updateGrade={this._updateGrade}
							_setGrade={this._setGrade}
						/>
					</Col>
				</Row>
				<Mutation
					mutation={GRADING_MUTATION}
					variables={{
						companyId: companyId,
						userGrades: this._intoArray(userGrades),
					}}
				>
					{GradingMutation => (
						<CausesJudgingInterfaceButtons
							cause={cause}
							gradingMutation={GradingMutation}
							_adjacentCause={this._adjacentCause}
							_stopGrading={this._stopGrading}
						/>
					)}
				</Mutation>
			</JudgingInterface>
		)
	}
}

export default CausesJudgingInterface
