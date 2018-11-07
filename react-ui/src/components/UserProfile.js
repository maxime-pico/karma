import React from 'react'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '../constants'
import { Grid, Row, Col, styled } from '@smooth-ui/core-sc'

const LogOutButton = styled.button`
	cursor: pointer;
	font-size: 1.2em;
	color: white;
	background: #c20e13;
	box-shadow: 3px 5px 18px #9c9c9c;
	border-radius: 30px;
	border: none;
	padding: 10px 20px;

	:hover,
	:focus:hover {
		background: #fa7377;
		box-shadow: 0px 0px 32px white;
	}
`

const MainText = styled.div`
	font-size: 1.4em;
	color: white;
	margin-bottom: 30px;
`

// display user profile info
class UserProfile extends React.Component {
	render() {
		const cookies = new Cookies()
		const authToken = cookies.get(AUTH_TOKEN) // check if token is set (user logged in)
		return (
			<Grid>
				<Row justifyContent="center">
					<Col md={6}>
						<MainText>
							Pour vous déconnecter cliquez sur le bouton ci-dessous :
						</MainText>
						{authToken && ( // if cookie set then display log out button
							<LogOutButton
								onClick={() => {
									cookies.remove(AUTH_TOKEN, { path: '/' }) // remove token from cookies onclick
									this.props.history.push(`/`) // redirect to home
								}}
							>
								Se Déconnecter
							</LogOutButton>
						)}
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default UserProfile
