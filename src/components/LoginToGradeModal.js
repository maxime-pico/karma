import React from 'react'
import { Portal } from 'react-portal'
import { Link } from 'react-router-dom'
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

class LoginToGradeModal extends React.Component {
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
									Vous devez être connecté pour noter ! Cliquez sur le bouton
									ci-dessous pour vous connecter et/ou vous inscrire :
								</div>
							</div>
							<div className="row justify-content-center text-center m-4">
								<div className="col">
									<Link to="/login/">
										<button type="button" className="btn btn-primary">
											Je deviens un Panda Eveillé !
										</button>
									</Link>
								</div>
							</div>
						</Modal>
					</Backdrop>
				</Portal>
			)
		else return null
	}
}

export default LoginToGradeModal
