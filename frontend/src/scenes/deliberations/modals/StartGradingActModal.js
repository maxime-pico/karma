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
		border-color: transparent;
	}
`

const GradeButton = styled.button`
	background-color: #a9b4cc;
	border-radius: 35px;
	border: none;
	padding: 10px 40px;
	font-size: 16px;
	color: white;
	white-space: normal;
	max-width: 100%;

	:hover {
		color: #a9b4cc;
		background: #d3e2ff;
	}
	&.btn-secondary {
		background: #7f8799;
	}
`

class StartGradingActModal extends React.Component {
	constructor(props) {
		super(props)
		this._closeModal = this.props._closeModal
		this._gradingType = this.props._gradingType
	}

	render() {
		const { _closeModal, _gradingType } = this
		if (this.props.isOpen)
			return (
				<Portal node={document && document.getElementById('App')}>
					<Backdrop>
						<Modal>
							<Row justifyContent="center" mb={5}>
								<Col className="col">
									<Title>Vous entrez en mode notation</Title>
									<Content>
										<p>
											Certaines fonctionnalités et navigations seront
											restreintes tant que vous n’aurez pas fini votre notation.
										</p>
										<p>
											Pour juger un Acte, vous devrez necessairement appuyer
											votre note sur une opinion. Vous pouvez en créer une
											nouvelle ou en choisir une parmis celles qui existent
											déjà.
										</p>
									</Content>
									<SubTitle>Que souhaitez-vous faire ?</SubTitle>
								</Col>
							</Row>
							<Row justifyContent="center" textAlign="center" m={4}>
								<Col md={6}>
									<GradeButton
										type="button"
										className="btn btn-secondary"
										onClick={() => _gradingType('new')}
									>
										Ajouter ma propre opinion
									</GradeButton>
								</Col>
								<Col md={6}>
									<GradeButton
										type="button"
										className="btn btn-primary"
										onClick={() => _gradingType('affiliation')}
									>
										M'affilier a une opinion existante
									</GradeButton>
								</Col>
							</Row>
							<Row justifyContent="center">
								<Col md={4}>
									<CancelButton
										type="button"
										className="btn btn-primary"
										onClick={_closeModal}
									>
										Annuler
									</CancelButton>
								</Col>
							</Row>
						</Modal>
					</Backdrop>
				</Portal>
			)
		else return null
	}
}

export default StartGradingActModal
