/*
  Modal handled with portal and triggered in Soul, Cause and Deliberation when
  modalIsOpen state is switched to true. This modal redirects the user to the
  login page
*/
import React from 'react'
import { Portal } from 'react-portal'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
const Backdrop = styled.div`
	position: absolute;
	background-color: rgba(255, 255, 255, 0.21);
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
	width: 50%;
	max-width: 800px;
	background-color: #fff;
	padding: 60px;
	border-radius: 50px;
	z-index: 1;
  }
`

const Title = styled.div`
  font-size: 24px
  font-weight: 600;
  color: #545A66;
  margin-bottom:12px
`

const Content = styled.div`
  font-size: 20px
  text-align: left;
  margin-bottom:24px
`

const LoginButton = styled.button`
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
// </STYLE>

// Checks if modal should be open, then displays it and its content
class LoginToSuggestModal extends React.Component {
  constructor(props) {
    super(props)
    this._closeModal = this.props._closeModal // get event handler from parent
  }

  render() {
    const _closeModal = this._closeModal
    if (this.props.isOpen)
      // isOpen is equal to modalIsOpen for the parent component
      return (
        <Portal node={document && document.getElementById('App')}>
          <Backdrop onClick={_closeModal}>
            <Modal>
              <Row justifyContent="center" mb={5}>
                <Col>
                  <Title> Vous devez être connecté pour voter ou suggérer une marque !</Title>
                  <Content>
                    Cliquez sur le bouton ci-dessous pour vous connecter et/ou
										vous inscrire :
									</Content>
                </Col>
              </Row>
              <Row justifyContent="center" textAlign="center" m={4}>
                <Col className="col">
                  <Link to="/login/">
                    <LoginButton type="button" className="btn btn-primary">
                      Se connecter
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

export default LoginToSuggestModal
