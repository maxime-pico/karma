import React from 'react'
import { convertGradesIntoWords } from '../utils'
import PandaSlider from './PandaSlider'
import ActJudgingInterfaceForm from './ActJudgingInterfaceForm'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const JudgingInterface = styled.div`
	color: black;
	font-size: 1.2em;
	.important {
		font-size: 1.3em;
		font-weight: 600;
	}
`

class ActJudgingInterface extends React.Component {
	state = {
		grade: 0,
		act: this.props.act,
	}

	_updateGrade = grade => {
		this.setState(previousState => {
			previousState.grade = grade
			return previousState
		})
	}

	render() {
		const { act, companyId, affiliation } = this.props

		return (
			<JudgingInterface>
				<Row>
					<Col className="important">{this.state.grade}</Col>
				</Row>
				<Row>
					<Col className="important">
						{convertGradesIntoWords(this.state.grade, 'act').fr}
					</Col>
				</Row>
				<Row justifyContent="center" my={4}>
					<Col md={3}>
						<PandaSlider
							identifier={act}
							karma={this.state.grade}
							type={'global'}
							disabled={false}
							_updateGrade={this._updateGrade}
							_setGrade={this._updateGrade}
						/>
					</Col>
				</Row>
				<ActJudgingInterfaceForm
					grade={this.state.grade}
					companyId={companyId}
					act={act}
					affiliation={affiliation}
				/>
			</JudgingInterface>
		)
	}
}

export default ActJudgingInterface
