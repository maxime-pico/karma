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

class StartGradingActModal extends React.Component {
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
										Vous êtes sur le point de juger l'acte d'une entreprise.
									</p>
									<p>
										Tout d'abord un grand merci de la part de tous les Pandas !
									</p>
									<p>
										Tout jugement d'acte doit s'accompagner de l'affiliation à
										une opinion. Une opinion c'est un texte, appuyé de sources,
										qui va résumer tous les indices qui peuvent aider à juger le
										rôle de l'entreprise pour l'acte en question. Nous vous
										invitons à commencer à parcourir la liste des opinions des
										Pandas qui ont fait un travail de recherche avant vous. Si
										l'une de ces opinions vous convient, vous pouvez y affilier
										votre note. Sinon, à vous d'écrire une nouvelle opinion !
										Bon travail de recherche :)
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

export default StartGradingActModal
