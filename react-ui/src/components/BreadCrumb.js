import React from 'react'
import { CAUSE_AND_ACTS } from '../constants'
import { adjacentCause } from '../utils'
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Crumb = styled.div`
	color: white;
	font-size: 14px;
`
const BreadButton = styled.button`
	height: 16px;
	width: 23px;
	background-color: #a9b4cc;
	border-radius: 6px;
	color: white;
	font-weight: bold;
	line-height: 13px;
	margin-left: 6px;
	padding: 0 1px;
`

class BreadCrumb extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
	}
	_adjacentCause = (cause, direction) => {
		if (direction && cause) {
			const rootUrl = this.props.location.pathname.match(/(.*)\/cause\//)[0]
			this.props.history.push({
				pathname: rootUrl + `${adjacentCause(cause, direction)}/`,
			})
		}
	}
	render() {
		const { companyId, cause, act } = this.props
		return (
			<Row justifyContent="left" mb="60px">
				<Col ml={4} textAlign="left">
					<Crumb>
						<Link to={`/company/${companyId}`}> Vue d'ensemble (âme) </Link> >{' '}
						<Link to={`/company/${companyId}/cause/${cause}`}>
							{CAUSE_AND_ACTS[cause].fr}
						</Link>{' '}
						<Link to={`/company/${companyId}/cause/${cause}/act/${act}`}>
							{act ? ' > ' + CAUSE_AND_ACTS[act] : null}
						</Link>
						<BreadButton
							type="button"
							onClick={() => this._adjacentCause(cause, -1)}
						>
							{'<'}
						</BreadButton>
						<BreadButton
							type="button"
							onClick={() => this._adjacentCause(cause, 1)}
						>
							{'>'}
						</BreadButton>
					</Crumb>
				</Col>
			</Row>
		)
	}
}

export default withRouter(BreadCrumb)
