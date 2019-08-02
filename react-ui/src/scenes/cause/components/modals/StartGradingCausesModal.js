import React from 'react'
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
`

const Modal = styled.div`
	font-size: 16px;
	width: 50%;
	max-width: 800px;
	background-color: #fff;
	padding: 60px;
	border-radius: 50px;
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
  color: #7F8799;
  text-align: left;
  margin-bottom:24px
`

const CancelButton = styled.button`
	background-color: white;
	border-radius: 35px;
	border: 1px solid #d8d8d8;
	padding: 10px 40px;
	font-size: 20px;
	color: #7f8799;

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

class StartGradingCausesModal extends React.Component {
	constructor(props) {
		super(props)
		this._closeModalAndContinue = this.props._closeModalAndContinue
	}

	render() {
		const _closeModalAndContinue = this._closeModalAndContinue
		if (this.props.isOpen)
			return (
				<Portal node={document && document.getElementById('App')}>
					<Backdrop onclick={() => _closeModalAndContinue(false)}>
						<Modal>
							<Row justifyContent="center" mb={5}>
								<Col className="col">
									<Title>Vous entrez en mode notation</Title>
									<Content>
										Certaines fonctionnalités et navigations seront restreintes
										tant que vous n’aurez pas fini votre notation.
									</Content>
									<SubTitle>Êtes-vous sûr de vouloir continuer ?</SubTitle>
								</Col>
							</Row>
							<Row justifyContent="center" textAlign="center" m={4}>
								<Col md={4}>
									<CancelButton
										type="button"
										className="btn btn-primary"
										onClick={() => _closeModalAndContinue(false)}
									>
										Non
									</CancelButton>
								</Col>
								<Col md={4}>
									<GradeButton
										type="button"
										className="btn btn-primary"
										onClick={() => _closeModalAndContinue(true)}
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

export default StartGradingCausesModal
