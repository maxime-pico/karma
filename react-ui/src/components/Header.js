import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import karmalogo from '../images/logo.png'
import UserBubble from './UserBubble'
import CompanyOverview from './CompanyOverview'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

const HeaderBubble = styled.div`
	background-color: white;
	padding: 30px 50px 30px 40px;
	margin: 0 40px 0 0;
	border-radius: 0 0 100px 0;
	box-shadow: inset -8px -3px 20px #80808040;
`
const HomeButton = styled.div`
	padding-top: 3px;
	font-weight: 600;
	font-size: 1.1em;
`
const TopRightCorner = styled.div`
	color: white;
	padding: 30px 30px 0 0;
	font-weight: 600;
	font-size: 1.1em;
`

class Header extends React.Component {
	render() {
		const cookies = new Cookies() // get access to cookies
		const authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken now contains the token
		const match = this.props.location.pathname.match(/\/company\/(.*?)(\/|$)/)
		const companyId = match ? match[1] : null
		return (
			<Grid fluid>
				<Row>
					<Col p={0} style={{ marginRight: 'auto' }}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
							}}
						>
							<HeaderBubble>
								{companyId ? (
									<CompanyOverview companyId={companyId} />
								) : (
									<img src={karmalogo} height="60" alt="karma panda" />
								)}
							</HeaderBubble>
						</div>
					</Col>
					<Col p={0}>
						<HomeButton>
							<Link to="/" style={{ color: 'white' }}>
								Toutes les entreprises
							</Link>
						</HomeButton>
					</Col>
					<Col p={0} style={{ marginLeft: 'auto' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<TopRightCorner>
								{authToken ? (
									<UserBubble />
								) : (
									<Link to="/login" className="ml1 no-underline black">
										Se connecter ou S'incrire
									</Link>
								)}
							</TopRightCorner>
						</div>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default withRouter(Header)
