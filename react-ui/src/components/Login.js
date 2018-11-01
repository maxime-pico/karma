// TODO: check passport.js and account.js to improve security

import React from 'react'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
			<div>
				<h4 className="mv3">{login ? 'Se Connecter' : "S'inscrire"}</h4>
				<div className="flex flex-column">
					{!login && ( // if signup form then display name field
						<input
							value={name}
							onChange={e => this.setState({ name: e.target.value })}
							type="text"
							placeholder="Votre Pseudo"
						/>
					)}
					<input
						value={email}
						onChange={e => this.setState({ email: e.target.value })} // store value of input field in state as the user types
						type="text"
						placeholder="Votre adresse mail"
					/>
					<input
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
						type="password"
						placeholder="Votre mot de passe"
					/>
				</div>
				<div className="flex mt3">
					<Mutation // wrap login/signup button in mutation component to send mutation onclick
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION} // use relevant mutation depending on state
						variables={{ email, password, name }} // pass variables for the mutation
						onCompleted={data => this._confirm(data)} // send data (token) to function when mutation complete
					>
						{mutation => (
							<button className="pointer mr2 button" onClick={mutation}>
								{login ? 'Se connecter' : 'Créer un compte'}
							</button>
						)}
					</Mutation>
					<button
						className="pointer button"
						onClick={() => this.setState({ login: !login })} // switch between signup and login forms
					>
						{login
							? 'Besoin de vous créer un compte ?'
							: 'Vous avez déjà un compte ?'}
					</button>
				</div>
			</div>
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
