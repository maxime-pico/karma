import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Opinion from './Opinion'
import { styled } from '@smooth-ui/core-sc'

const DefaultText = styled.span`
	color: white;
	font-size: 1.2em;
	font-weight: 600;
`

const OPINION_FEED_QUERY = gql`
	query OpinionFeedQuery($companyId: ID!, $act: Act!) {
		opinionsFeed(companyId: $companyId, act: $act) {
			id
			createdAt
			title
			text
			regardingWhat
			tags
			sources
			writtenBy {
				name
				picture
			}
			affiliationsCount
		}
	}
`

const OpinionFeed = ({
	act,
	companyId,
	grading,
	affiliation,
	_selectOpinion,
}) => (
	<Query query={OPINION_FEED_QUERY} variables={{ companyId, act }}>
		{({ loading, error, data }) => {
			if (loading) return <div> Fetching </div>
			if (error) return <div> Error </div>
			const opinionsFeed = data.opinionsFeed

			return (
				<div>
					{opinionsFeed.length ? (
						opinionsFeed.map((opinion, index) => (
							<Opinion
								key={index}
								opinion={opinion}
								affiliation={affiliation}
								grading={grading}
								_selectOpinion={_selectOpinion}
							/>
						))
					) : (
						<DefaultText>
							Il n'y a pas encore d'opinions pour cet Acte
						</DefaultText>
					)}
				</div>
			)
		}}
	</Query>
)

export default OpinionFeed
