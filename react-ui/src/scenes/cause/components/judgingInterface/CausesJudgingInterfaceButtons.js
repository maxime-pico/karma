import React from 'react'
import PandaSlider from '../../../../components/slider/PandaSlider'
import ConfirmGradesModal from '../modals/ConfirmGradesModal'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const NavButtons = styled.button`
	font-size: 15px;
	color: white;
	background-color: transparent;
	border-radius: 30px;
	border: 1px solid white;

	:hover,
	:focus:hover {
		background-color: #d8d8d8;
		color: white;
	}
	&.confirm {
		background-color: #a9b4cc;
		color: white;
		border: none;
	}
`

class CausesJudgingInterfaceButtons extends React.Component {
	constructor(props) {
		super(props)
		this._adjacentCause = this.props._adjacentCause
		this._stopGrading = this.props._stopGrading
		this._updateGrade = this.props._updateGrade
		this._setGrade = this.props._setGrade
		this._blurBackground = this.props._blurBackground
		this.cause = this.props.cause
		this.gradingMutation = this.props.gradingMutation
		this.userGrades = this.props.userGrades
		this.brandName = this.props.brandName
	}

	state = {
		confirmGradesModalIsOpen: false,
	}

	_closeGradesModal = () => {
		this.setState(previousState => {
			this._blurBackground(false)
			previousState.confirmGradesModalIsOpen = false
			return previousState
		})
	}

	_openconfirmGradesModal = () => {
		this.setState(previousState => {
			previousState.confirmGradesModalIsOpen = true
			this._blurBackground(true)
			return previousState
		})
	}

	render() {
		const {
			_adjacentCause,
			_updateGrade,
			_setGrade,
			_stopGrading,
			gradingMutation,
			cause,
			userGrades,
			brandName,
		} = this.props
		return (
			<Row justifyContent="center">
				<Col md={3}>
					{cause !== 'ENVIRONMENT' && (
						<NavButtons
							type="button"
							className="btn btn-secondary"
							onClick={() => _adjacentCause(-1)}
						>
							Cause Précédente
						</NavButtons>
					)}
				</Col>
				<Col md={3}>
					<PandaSlider
						cause={cause}
						type={'global'}
						disabled={false}
						_updateGrade={_updateGrade}
						_setGrade={_setGrade}
					/>
				</Col>
				{cause === 'FISCAL' ? (
					<Col md={3}>
						<NavButtons
							type="button"
							className="btn confirm"
							onClick={() => this._openconfirmGradesModal()}
						>
							Valider mes notes
						</NavButtons>
					</Col>
				) : (
					<Col md={3}>
						<NavButtons
							type="button"
							className="btn btn-secondary"
							onClick={() => _adjacentCause(1)}
						>
							Cause Suivante
						</NavButtons>
					</Col>
				)}
				<ConfirmGradesModal
					isOpen={this.state.confirmGradesModalIsOpen}
					userGrades={userGrades}
					brandName={brandName}
					_closeGradesModal={this._closeGradesModal}
					_stopGrading={_stopGrading}
					gradingMutation={gradingMutation}
				/>
			</Row>
		)
	}
}

export default CausesJudgingInterfaceButtons
