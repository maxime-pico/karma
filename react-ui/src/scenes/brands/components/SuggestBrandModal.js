/*
  Modal handled with portal and triggered in Soul, Cause and Deliberation when
  modalIsOpen state is switched to true. This modal redirects the user to the
  login page
*/
import React from 'react'
import { Portal } from 'react-portal'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'
import BasicButton from './../../../components//buttons/BasicButton'

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
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

const Title = styled.div`
  font-size: 3rem
  font-family: 'Avenir-Black', sans-serif;
  color: #545A66;
`

const Subtitle = styled.div`
  font-size: 2rem
  font-family: 'Avenir-Black', sans-serif;
  color: #7C8696;
  margin-bottom: 5rem;
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

const TextInput = styled.input`
  padding: 2rem;
  border-radius: 4rem;
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom:1rem;
`

const Buttons = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:2rem;

  button{
    margin-left: 2rem;
  }
`

const Legend = styled.p`
font-size:1.4rem;
text-align:center;
width:100%;
margin-top: 1.2rem;
`
// </STYLE>

// Checks if modal should be open, then displays it and its content
class SuggestBrandModal extends React.Component {

  state = {
    isOpen: false
  }
  constructor(props) {
    super(props)
    this._closeModal = this.props.closeModal.bind(this) // get event handler from parent
    this.setState({ isOpen: this.props.isOpen })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen })
  }


  render() {
    const _closeModal = this._closeModal
    if (this.state.isOpen)
      // isOpen is equal to modalIsOpen for the parent component
      return (
        <Portal node={document && document.getElementById('App')}>
          <Backdrop >
            <Modal>
              <Row justifyContent="center" mb={5}>
                <Title>Suggérer une nouvelle marque</Title>
                <Subtitle>Proposer une nouvelle marque qui doit être évaluée</Subtitle>
                <form>
                  <TextInput type="text" name="brand_name" value="" placeholder="Nom de la marque" />
                  <TextInput type="text" name="brand_website" value="" placeholder="Adresse du site internet" />
                  <Buttons>
                    <span onClick={this._closeModal}>Annuler</span>
                    <BasicButton type="submit">Ajouter</BasicButton>
                  </Buttons>
                  <Legend>Proposition soumise à modération avant ajout dans la liste</Legend>
                </form>
              </Row>
              <Row justifyContent="center" textAlign="center" m={4}>

              </Row>
            </Modal>
          </Backdrop>
        </Portal>
      )
    else return null
  }
}

export default SuggestBrandModal
