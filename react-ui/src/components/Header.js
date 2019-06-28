import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import karmalogo from '../images/logo-small.svg'
import UserBubble from './UserBubble'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

const Navbar = styled(Row)`
	color: #a9b4cc;
	padding: 12px 42px;
	font-size: 14px;
	background-color: white;
	text-align: left;
	margin-bottom: 96px;
`

const NavbarLink = styled(Link)`
	margin: auto;
	margin: auto 0 auto 42px;
`

class Header extends React.Component {
	render() {
		const cookies = new Cookies() // get access to cookies
		const authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken now contains the token
		return (
			<Grid fluid>
				<Navbar>
					<Col p={0} style={{ marginRight: 'auto' }}>
						<Link to="/">
							<img src={karmalogo} height="35" alt="karma panda" />
						</Link>
					</Col>
					<Col p={0} style={{ alignSelf: 'center' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<NavbarLink to="/help">aide</NavbarLink>
							<NavbarLink to="/about">à propos</NavbarLink>
							<NavbarLink to="/brands">marques</NavbarLink>
							{authToken ? (
								<UserBubble />
							) : (
								<NavbarLink to="/login" className="ml1 no-underline black">
									connexion
								</NavbarLink>
							)}
						</div>
					</Col>
				</Navbar>
			</Grid>
		)
	}
}

export default withRouter(Header)
