import React from 'react'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '../../services/constants'
import { Grid, Row, Col, styled } from '@smooth-ui/core-sc'

const LogOutButton = styled.button`
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

const MainText = styled.div`
	font-size: 20px;
	margin-bottom: 30px;
`

// display user profile info
class UserProfile extends React.Component {
	render() {
		const cookies = new Cookies()
		const authToken = cookies.get(AUTH_TOKEN) // check if token is set (user logged in)
		return (
			<Grid>
				<Row justifyContent="center" mt="120px">
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
