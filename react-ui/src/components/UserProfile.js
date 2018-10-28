import React from 'react'
import Cookies from 'universal-cookie'
import { AUTH_TOKEN } from '../constants'

// display user profile info
class UserProfile extends React.Component {
	render() {
		const cookies = new Cookies()
		const authToken = cookies.get(AUTH_TOKEN) // check if token is set (user logged in)
		return (
			<div>
				<div>TODO User Profile page</div>
				{authToken && ( // if cookie set then display log out button
					<button
						onClick={() => {
							cookies.remove(AUTH_TOKEN, { path: '/' }) // remove token from cookies onclick
							this.props.history.push(`/`) // redirect to home
						}}
					>
						log out
					</button>
				)}
			</div>
		)
	}
}

export default UserProfile
