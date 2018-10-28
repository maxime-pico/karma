import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { STATUS } from '../constants'

// query that retireves the id of the user from context
const USER_ID_QUERY = gql`
	query UserIdQuery {
		getUserInfoFromContext {
			id
			name
			picture
			status
		}
	}
`
// Displays the picture name and status of a user, takes the userId as a prop
class UserBubble extends React.Component {
	render() {
		return (
			<Query query={USER_ID_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const { id, name, picture, status } = data.getUserInfoFromContext
					return (
						<Link to={`/user/${id}`} className="ml1 no-underline black">
							<div>
								<img
									src={process.env.PUBLIC_URL + '/images/' + picture}
									alt="user profile"
									height="50"
									width="60"
								/>
							</div>
							<div>{name}</div>
							{/* get readable status equivalent from STATUS table*/}
							<div>{STATUS[status].fr}</div>{' '}
						</Link>
					)
				}}
			</Query>
		)
	}
}

export default UserBubble
