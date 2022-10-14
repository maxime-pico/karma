import React from 'react'
import { CAUSE_AND_ACTS } from '../../../../services/constants.js'
import { Portal } from 'react-portal'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Backdrop = styled.div`
	position: absolute;
	background-color: rgba(255, 255, 255, 0.2);
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3000;
`

const Modal = styled.div`
	font-size: 16px;
	width: 50%;
	max-width: 800px;
	background-color: #fff;
	padding: 60px;
	border-radius: 50px;
	z-index: 4000;
`
const Title = styled.div`
  font-size: 24px
  font-weight: 600;
  color: #545A66;
  margin-bottom:12px
`
const SubTitle = styled.div`
  font-size: 20px
  font-weight: 600;
  color: #545A66;
  margin-bottom:12px
`

const Content = styled.div`
  font-size: 20px
  text-align: left;
  margin-bottom:42px
`

const CancelButton = styled.button`
	background-color: white;
	border-radius: 35px;
	border: 1px solid #d8d8d8;
	padding: 10px 40px;
	font-size: 20px;

	:hover {
		color: white;
		background: #a9b4cc;
		border: none;
	}
`

const GradeButton = styled.button`
	background-color: #a9b4cc;
	border-radius: 35px;
	border: none;
	padding: 10px 40px;
	font-size: 20px;
	color: white;

	:hover {
		color: #a9b4cc;
		background: #d3e2ff;
	}
`

class ConfirmGradesModal extends React.Component {
	constructor(props) {
		super(props)
		this.userGrades = this.props.userGrades
		this.brandName = this.props.brandName
		this._closeGradesModal = this.props._closeGradesModal
		this.gradingMutation = this.props.gradingMutation
		this.overallMutation = this.props.overallMutation
	}

	_validateGrading = async () => {
		this.gradingMutation().then(() => this.overallMutation())
		return null
	}

	render() {
		const grades = this.userGrades
		if (this.props.isOpen)
			return (
				<Portal node={document && document.getElementById('App')}>
					<Backdrop onClick={() => this._closeGradesModal()}>
						<Modal>
							<Row justifyContent="center" mb={5}>
								<Col className="col">
									<Title>Petit récapitulatif...</Title>
									<Content>
										Vous êtes sur le point d'attribuer les notes suivantes à{' '}
										{this.brandName} :
										{grades
											? Object.keys(grades).map((category, i) => (
													<Row
														key={i}
														pl="12px"
														pr="24px"
														justifyContent="space-between"
														fontSize="17px"
														mt="6px"
													>
														<Col>{CAUSE_AND_ACTS[category].fr}</Col>{' '}
														<Col md={1} textAlign="right">
															{grades[category]}
														</Col>
													</Row>
											  ))
											: null}
									</Content>
									<SubTitle>Ceci est bien votre jugement final ?</SubTitle>
								</Col>
							</Row>
							<Row justifyContent="center" textAlign="center" m={4}>
								<Col md={4}>
									<CancelButton
										type="button"
										className="btn btn-primary"
										onClick={() => this._closeGradesModal()}
									>
										Non
									</CancelButton>
								</Col>
								<Col md={4}>
									<GradeButton
										type="button"
										className="btn btn-primary"
										onClick={() => this._validateGrading()}
									>
										Oui
									</GradeButton>
								</Col>
							</Row>
						</Modal>
					</Backdrop>
				</Portal>
			)
		else return null
	}
}

export default ConfirmGradesModal
