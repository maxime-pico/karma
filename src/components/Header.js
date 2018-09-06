import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends React.Component {
	render() {
		return (
			<div>
				Header (todo) | <Link to="/">Search</Link> |
				<Link to="/user"> User Profile</Link>
			</div>
		)
	}
}

export default withRouter(Header)
