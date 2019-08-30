/*
  Modal handled with portal and triggered in Soul, Cause and Deliberation when
  modalIsOpen state is switched to true. This modal redirects the user to the
  login page
*/
import React from 'react'
import { Portal } from 'react-portal'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

// <STYLE>
const Backdrop = styled.div`
  position: fixed; 
  background-color:rgba(83,91,101,0.95);  
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

  state = {
    isOpen: false
  }
  constructor(props) {
    super(props)
    // this._closeModal = this.props._closeModal // get event handler from parent
    this.state.isOpen = this.props.isOpen 
  }

  _closeModal(){
    this.setState({ isOpen: false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen })
  }

  render() {
    
      // isOpen is equal to modalIsOpen for the parent component
      return (
        <TransitionGroup component={null}>
        {this.state.isOpen && (
          <CSSTransition
            timeout={500}
            classNames="modal"
          >
        <Portal node={document && document.getElementById('App')}>
          <Backdrop onClick={this._closeModal.bind(this)}>
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
        </CSSTransition>
        )}
      </TransitionGroup>
      )
   
  }
}

export default LoginToSuggestModal
