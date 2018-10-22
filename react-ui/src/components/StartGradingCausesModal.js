import React from 'react'
import { Portal } from 'react-portal'
import styled from 'styled-components'

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
	font-size: 20px;
	width: 500px;
	background-color: #fff;
	padding: 10px;
	border-radius: 25px;
	border: 1pt solid black;
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
							<div className="row d-flex justify-content-center mb-5">
								<div className="col">
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
								</div>
							</div>
							<div className="row justify-content-center text-center m-4">
								<div className="col">
									<button type="button" className="btn btn-primary">
										C'est parti !
									</button>
								</div>
							</div>
						</Modal>
					</Backdrop>
				</Portal>
			)
		else return null
	}
}

export default StartGradingCausesModal
