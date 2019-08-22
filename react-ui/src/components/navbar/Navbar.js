import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../../services/constants'
import karmalogo from '../../images/logo-small.svg'
import UserBubble from '../userBubble/UserBubble'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

const NavbarBox = styled(Row)`
	color: #a9b4cc;
	padding: 12px 42px;
	font-size: 14px;
	background-color: white;
	text-align: left;
	@media (max-width: 540px) {
		padding: 0;
	}
`

const NavbarLink = styled(Link)`
	margin: auto;
	margin: auto 0 auto 42px;
	@media (max-width: 540px) {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin: auto;
		text-align: center;
		border-top: 1px solid rgba(169, 180, 204, 0.7);
		//display: block;
	}
`

const NavbarLinkContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	@media (max-width: 540px) {
		flex-flow: column wrap;
		display: ${props => props.displayValue};
	}
`

const LogoContainer = styled(Col)`
	padding: 0px;
	margin-right: auto;
	@media (max-width: 540px) {
		padding: 7px;
	}
`
const BurgerBar = styled.div`
	width: 25px;
	height: 2px;
	background-color: rgba(169, 180, 204, 0.7);
	margin: 6px 0;
`

const BurgerMenu = styled(Col)`
	display: none;
	@media (max-width: 540px) {
		display: block;
	}
`

class Navbar extends React.Component {
	constructor() {
		super()
		this.state = {
			isBurgerOpen: false,
		}
	}
	_toggleBurger() {
		this.setState({ isBurgerOpen: !this.state.isBurgerOpen })
	}
	render() {
		const cookies = new Cookies() // get access to cookies
		const authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken now contains the token
		let burgerDisplayProp = this.state.isBurgerOpen ? 'flex' : 'none'
		return (
			<Grid fluid>
				<NavbarBox>
					<LogoContainer xs={10} md={6}>
						<Link to="/">
							<img src={karmalogo} height="35" alt="karma panda" />
						</Link>
					</LogoContainer>
					<BurgerMenu
						xs={2}
						style={{ alignSelf: 'center' }}
						onClick={this._toggleBurger.bind(this)}
					>
						<BurgerBar></BurgerBar>
						<BurgerBar></BurgerBar>
						<BurgerBar></BurgerBar>
					</BurgerMenu>
					<Col xs={12} md={6} p={0} style={{ alignSelf: 'center' }}>
						<NavbarLinkContainer displayValue={burgerDisplayProp}>
							<NavbarLink to="/brands">marques</NavbarLink>
							<NavbarLink to="/help">aide</NavbarLink>
							<NavbarLink to="/about">à propos</NavbarLink>
							<div className="d-none d-sm-block">
								{authToken ? (
									<UserBubble />
								) : (
									<NavbarLink to="/login" className="ml1 no-underline black">
										connexion
									</NavbarLink>
								)}
							</div>
						</NavbarLinkContainer>
					</Col>
				</NavbarBox>
			</Grid>
		)
	}
}

export default withRouter(Navbar)
