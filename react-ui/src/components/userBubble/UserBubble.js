import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const RoundWindow = styled.div`
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: white;
	margin: auto;
	margin-left: 42px;
	img {
		width: ${props => props.size}px;
	}
`

const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`

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
					const { id, picture } = data.getUserInfoFromContext
					return (
						<Link to={`/user/${id}`} className="ml1 no-underline black">
							<RoundWindow size={35}>
								<Push />
								<img
									src={process.env.PUBLIC_URL + '/images/' + picture}
									alt="user profile"
								/>
							</RoundWindow>
						</Link>
					)
				}}
			</Query>
		)
	}
}

export default UserBubble
