// TODO: check passport.js and account.js to improve security

import React from 'react'
import Cookies from 'universal-cookie'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../../services/constants'
import { Grid, Row, Col, styled } from '@smooth-ui/core-sc'

const LoginBox = styled(Grid)`
	margin-top: 96px;
	border-radius: 96px;
	padding: 42px;
	background-color: white;
	color: #7f8799;
	font-size: 16px;
	max-width: 800px;
	width: 70%;
`

const Title = styled(Row)`
	font-size: 2em;
	text-align: center;
`

const Label = styled.div`
	font-size: 1.2em;
	text-align: left;
	margin-bottom: 5px;
`
const ErrorMessage = styled.div`
	font-size: 1.1em;
	color: red;
	margin: 10px 0;
`
const InputBox = styled.input`
  width: 100%
	padding: 6px 10px;
	border-radius: 12px;
	border: solid 1px #A9B4CC;
  background-color: #F7F7F7;
  margin-bottom: ${props => props.marginBottom}
  :focus {
    outline: none;
		box-shadow: 0 0 0 3px #A9B4CC;
	}
  :focus::-webkit-input-placeholder { color:transparent; }
  :focus:-moz-placeholder { color:transparent; } /* FF 4-18 */
  :focus::-moz-placeholder { color:transparent; } /* FF 19+ */
  :focus:-ms-input-placeholder { color:transparent; } /* IE 10+ */
`
const FormSubmitButton = styled.button`
	background-color: #a9b4cc;
	border-radius: 35px;
	border: none;
	padding: 10px 40px;
	font-size: 20px;
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

const SwitchButton = styled.button`
	font-size: 18px;
	cursor: pointer;
	border: none;
	background-color: transparent;
	color: inherit;
`

// signup new user and get token back
const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

// signup existing user and get token back
const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

class Login extends React.Component {
	state = {
		login: true, // switch between Login and SignUp
		email: '', // store value from input fields
		password: '',
		name: '',
	}

	render() {
		const { login, email, password, name } = this.state
		return (
			<LoginBox>
				<Row justifyContent="center">
					<Col md={8}>
						<Title mb={30} justifyContent="center">
							<Col>{login ? 'Connectez-vous' : 'Inscrivez-vous'}</Col>
						</Title>
						{!login && ( // if signup form then display name field
							<Row justifyContent="center">
								<Col md={8} mb={2}>
									<Label>Votre Pseudo</Label>
									<InputBox
										value={name}
										onChange={e => this.setState({ name: e.target.value })}
										type="text"
										placeholder="Po Ping"
									/>
								</Col>
							</Row>
						)}
						<Row justifyContent="center">
							<Col md={8} mb={2}>
								<Label>Votre Email</Label>
								<InputBox
									value={email}
									onChange={e => this.setState({ email: e.target.value })} // store value of input field in state as the user types
									type="text"
									placeholder="po.ping@kungfupanda.com"
								/>
							</Col>
						</Row>
						<Row justifyContent="center" mb={1}>
							<Col md={8} mb={2}>
								<Label>Votre Mot de Passe</Label>
								<InputBox
									value={password}
									onChange={e => this.setState({ password: e.target.value })}
									type="password"
									placeholder="Nouilles"
								/>
							</Col>
						</Row>
						<Row justifyContent="center" mt={20}>
							<Col md={8}>
								<Mutation // wrap login/signup button in mutation component to send mutation onclick
									mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION} // use relevant mutation depending on state
									variables={{ email, password, name }} // pass variables for the mutation
									onCompleted={data => this._confirm(data)} // send data (token) to function when mutation complete
								>
									{(mutation, { error }) => (
										<div>
											<FormSubmitButton
												className="btn btn-primary"
												onClick={mutation}
											>
												{login ? 'Se connecter' : 'Créer un compte'}
											</FormSubmitButton>
											{error && (
												<ErrorMessage>
													Problème lors de la connexion. Veuillez vérifier votre
													mot de passe et votre email.
												</ErrorMessage>
											)}
										</div>
									)}
								</Mutation>
							</Col>
						</Row>
						<Row justifyContent="center" mt={10}>
							<Col md={8}>
								<SwitchButton
									className="pointer button"
									onClick={() => this.setState({ login: !login })} // switch between signup and login forms
								>
									{login
										? 'Besoin de vous créer un compte ?'
										: 'Vous avez déjà un compte ?'}
								</SwitchButton>
							</Col>
						</Row>
					</Col>
				</Row>
			</LoginBox>
		)
	}

	// get token from data and send it to store
	_confirm = async data => {
		const { token } = this.state.login ? data.login : data.signup
		this._saveUserData(token)
		this.props.history.push(`/`) // redirect to home
	}

	// store token in globally accessible cookie
	_saveUserData = token => {
		const cookies = new Cookies() // retrieve current cookie
		cookies.set(AUTH_TOKEN, token, {
			path: '/',
		}) // $AUTH_TOKEN key to $token
	}
}

export default Login
