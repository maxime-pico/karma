import React from 'react'
import { Portal } from 'react-portal'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Backdrop = styled.div`
	position: absolute;
	background-color: rgba(255, 255, 255, 0.8);
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Modal = styled.div`
	font-size: 1.2em;
	width: 500px;
	background-color: #fff;
	padding: 10px;
	border-radius: 25px;
	box-shadow: 0px 0px 30px grey;
`
const GradeButton = styled.button`
	background: linear-gradient(
		to right,
		#85d8e6,
		#b3d7f2 22.14%,
		#baacd4 41.51%,
		#af8cc0 56.2%,
		#d02417 98.46%,
		#d02417
	);
	box-shadow: 0px 0px 32px #ada9a98c;
	border-radius: 30px;
	border: none;
	padding: 10px 20px;
	font-size: 1.1em;

	:hover {
		color: #989898;
		background: white;
	}
	:active {
		background: #545b62;
	}
`

class StartGradingCausesModal extends React.Component {
	constructor(props) {
		super(props)
		this._closeModal = this.props._closeModal
	}

	render() {
		const _closeModal = this._closeModal
		if (this.props.isOpen)
			return (
				<Portal node={document && document.getElementById('App')}>
					<Backdrop onClick={_closeModal}>
						<Modal className="p-5">
							<Row justifyContent="center" mb={5}>
								<Col className="col">
									<p>
										Vous êtes sur le point d'attribuer du Karma à une
										entreprise.
									</p>
									<p>
										Tout d'abord un grand merci de la part de tous les Pandas !
									</p>
									<p>
										Vous allez tour à tour considérer les causes
										Environementale, Animale, Sociale, Ethique, Fiscalité &
										Gouvernance de cette entreprise. Par respect pour les autres
										Pandas, prenez le temps de considérer les notes des Actes
										(qui seront affichées plus bas) pour constituer votre
										jugement, soyez honnêtes intellectuellement et surtout
										amusez-vous bien !
									</p>
									<p>
										Cliquez sur le bouton ci-dessous pour commencer à noter :
									</p>
								</Col>
							</Row>
							<Row justifyContent="center" textAlign="center" m={4}>
								<Col>
									<GradeButton type="button" className="btn btn-primary">
										Appliquer la loi du Karma
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
