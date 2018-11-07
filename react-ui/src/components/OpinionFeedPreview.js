import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OpinionPreview from './OpinionPreview'
import { styled } from '@smooth-ui/core-sc'

const OpinionPreviewBox = styled.div`
	box-shadow: inset 0 0 20px #d4d4d4;
	border-radius: 55px;
`

const OPINION_FEED_QUERY = gql`
	query OpinionFeedQuery($companyId: ID!, $act: Act!, $first: Int) {
		opinionsFeed(companyId: $companyId, act: $act, first: $first) {
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

const OpinionFeedPreview = ({ act, companyId, first, location }) => (
	<Query query={OPINION_FEED_QUERY} variables={{ companyId, act, first }}>
		{({ loading, error, data }) => {
			if (loading) return <div> Fetching </div>
			if (error) return <div> Error </div>
			const opinionsFeed = data.opinionsFeed

			return (
				<OpinionPreviewBox>
					<OpinionPreview
						opinionsFeed={opinionsFeed}
						location={location}
						act={act}
					/>
				</OpinionPreviewBox>
			)
		}}
	</Query>
)

export default OpinionFeedPreview
