import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import karmalogo from '../images/logo.png'
import UserBubble from './UserBubble'
import CompanyOverview from './CompanyOverview'

class Header extends React.Component {
	render() {
		const cookies = new Cookies() // get access to cookies
		const authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken now contains the token
		const match = this.props.location.pathname.match(/\/company\/(.*?)(\/|$)/)
		const companyId = match ? match[1] : null
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						{companyId ? (
							<CompanyOverview companyId={companyId} />
						) : (
							<img src={karmalogo} height="60" alt="karma panda" />
						)}
					</div>
					<div className="col">
						<Link to="/">Search</Link>
					</div>
					<div className="col d-flex justify-content-end">
						{authToken ? (
							<UserBubble />
						) : (
							<Link to="/login" className="ml1 no-underline black">
								Signup or Login
							</Link>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Header)
