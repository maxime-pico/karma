import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends React.Component {
	render() {
		return (
			<div>
				Header (todo) | <Link to="/">Home</Link> |
				<Link to="/company">Soul</Link> |
				<Link to="/company/cause">Cause</Link> |
				<Link to="/company/cause/act">Act</Link> |
				<Link to="/user">User Profile</Link> |
			</div>
		)
	}
}

export default withRouter(Header)
