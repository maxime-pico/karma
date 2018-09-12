import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// query that retireves the id of the user from context
const USER_ID_QUERY = gql`
	query UserIdQuery {
		getUserInfoFromContext {
			id
			name
		}
	}
`

class Header extends React.Component {
	render() {
		const cookies = new Cookies() // get access to cookies
		const authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken now contains the token
		return (
			<table>
				<tbody>
					<tr>
						<td>Karma Panda - Header (todo)</td>
						<td>
							<Link to="/">Search</Link>
						</td>
						<td>
							{authToken ? (
								<Query query={USER_ID_QUERY}>
									{({ loading, error, data }) => {
										if (loading) return <div> Fetching </div>
										if (error) return <div> Error </div>
										const { id, name } = data.getUserInfoFromContext
										return (
											<Link
												to={`/user/${id}`}
												className="ml1 no-underline black"
											>
												{name}
											</Link>
										)
									}}
								</Query>
							) : (
								<Link to="/login" className="ml1 no-underline black">
									Signup or Login
								</Link>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default withRouter(Header)
