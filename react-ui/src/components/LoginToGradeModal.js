import React from 'react'
import { Portal } from 'react-portal'
import { Link } from 'react-router-dom'
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
	font-size: 20px;
	width: 500px;
	background-color: #fff;
	padding: 10px;
	border-radius: 25px;
	box-shadow: 0px 0px 30px grey;
`
const LoginButton = styled.button`
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
							<Row justifyContent="center" mb={5}>
								<Col>
									Vous devez être connecté pour noter ! Cliquez sur le bouton
									ci-dessous pour vous connecter et/ou vous inscrire :
								</Col>
							</Row>
							<Row justifyContent="center" textAlign="center" m={4}>
								<Col className="col">
									<Link to="/login/">
										<LoginButton type="button" className="btn btn-primary">
											Je deviens un Panda Eveillé !
										</LoginButton>
									</Link>
								</Col>
							</Row>
						</Modal>
					</Backdrop>
				</Portal>
			)
		else return null
	}
}

export default LoginToGradeModal
