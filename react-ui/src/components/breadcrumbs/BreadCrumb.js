/* Used in Cause and Deliberation Headers to display the route to the current page
and provide and easy link to next/previous cause or act */
import React from 'react'
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { adjacentCause, adjacentAct } from '../../services/utils'
import { AUTH_TOKEN, CAUSE_AND_ACTS } from '../../services/constants'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
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
	border: none;
`
// </STYLE>

//Gets derives location from props and finds adjacent cause or acts links from
//the two functions _adjacentCause and _adjacentAct. Hides the buttons in grading mode
class BreadCrumb extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
	}

	//Handler for the button. Direction is +1 for next or -1 for previous
	_adjacentCause = (cause, direction) => {
		if (direction && cause) {
			const rootUrl = this.props.location.pathname.match(/(.*)\/cause\//)[0]
			this.props.history.push({
				pathname: rootUrl + `${adjacentCause(cause, direction)}/`,
			})
		}
	}

	//Handler for the button. Direction is +1 for next or -1 for previous
	_adjacentAct = (cause, act, direction) => {
		if (direction && act) {
			const rootUrl = this.props.location.pathname.match(/(.*)\/act\//)[0]
			this.props.history.push({
				pathname: rootUrl + `${adjacentAct(cause, act, direction)}/`,
			})
		}
	}
	render() {
		const { companyId, cause, act, grading } = this.props
		return (
			<Row justifyContent="left" mb="60px">
				<Col ml={4} textAlign="left">
					<Crumb>
						<Link to={grading ? '#' : `/company/${companyId}`}>
							Vue d'ensemble (âme)
						</Link>
						{' > '}
						<Link to={`/company/${companyId}/cause/${cause}`}>
							{CAUSE_AND_ACTS[cause].fr}
						</Link>
						<Link to={`/company/${companyId}/cause/${cause}/act/${act}`}>
							{act ? ' > ' + CAUSE_AND_ACTS[act].fr : null}
						</Link>
						{!grading && ( //if grading = false, then display buttons
							<span>
								<BreadButton
									type="button"
									onClick={() =>
										act //if act props is provided, then use adjacentAct handler
											? this._adjacentAct(cause, act, -1)
											: this._adjacentCause(cause, -1)
									}
								>
									{'<'}
								</BreadButton>
								<BreadButton
									type="button"
									onClick={() =>
										act
											? this._adjacentAct(cause, act, 1)
											: this._adjacentCause(cause, 1)
									}
								>
									{'>'}
								</BreadButton>
							</span>
						)}
					</Crumb>
				</Col>
			</Row>
		)
	}
}

export default withRouter(BreadCrumb)
