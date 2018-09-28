import React from 'react'
import { convertGradesIntoWords } from '../utils'
import PandaSlider from './PandaSlider'
import ActJudgingInterfaceForm from './ActJudgingInterfaceForm'

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
			<div className="row">
				<div className="col">
					<div className="row">
						<div className="col">{this.state.grade}</div>
					</div>
					<div className="row">
						<div className="col">
							{convertGradesIntoWords(this.state.grade, 'act').fr}
						</div>
					</div>
					<div className="row d-flex justify-content-center my-4">
						<div className="col-3">
							<PandaSlider
								identifier={act}
								karma={this.state.grade}
								type={'global'}
								disabled={false}
								_updateGrade={this._updateGrade}
								_setGrade={this._updateGrade}
							/>
						</div>
					</div>
					<ActJudgingInterfaceForm
						grade={this.state.grade}
						companyId={companyId}
						act={act}
						affiliation={affiliation}
					/>
				</div>
			</div>
		)
	}
}

export default ActJudgingInterface
