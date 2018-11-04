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
	padding: ${props => {
		if (props.left) return '30px 30px 30px 0'
		if (props.right) return '30px 30px 30px 40px'
		if (props.middle) return '10px 30px 30px 30px'
		else return '0'
	}};
	margin: ${props => {
		if (props.left) return '0 40px 0 0'
		if (props.right) return '0 0 20px 30px'
		if (props.middle) return '0 30px 30px 30px'
		else return '0'
	}};
	border-radius: ${props => {
		if (props.left) return '0 0 100px 0'
		if (props.right) return '0 0 0 100px'
		if (props.middle) return '0 0 100px 100px'
		else return '0'
	}};
	box-shadow: ${props => {
		if (props.left) return 'inset -8px -3px 20px #80808040'
		if (props.right) return 'inset 8px -3px 20px #80808040'
		if (props.middle) return 'inset 0 -8px 20px #80808040'
		else return '0'
	}};
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
							<HeaderBubble left style={{ minWidth: '50%' }}>
								{companyId ? (
									<CompanyOverview companyId={companyId} />
								) : (
									<img src={karmalogo} height="60" alt="karma panda" />
								)}
							</HeaderBubble>
						</div>
					</Col>
					<Col p={0}>
						<HeaderBubble middle>
							<Link to="/">Toutes les entreprises</Link>
						</HeaderBubble>
					</Col>
					<Col p={0} style={{ marginLeft: 'auto' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<HeaderBubble right>
								{authToken ? (
									<UserBubble />
								) : (
									<Link to="/login" className="ml1 no-underline black">
										Se connecter ou S'incrire
									</Link>
								)}
							</HeaderBubble>
						</div>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default withRouter(Header)
