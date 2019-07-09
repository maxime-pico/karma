import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OpinionPreview from './OpinionPreview'
import ActCardHeader from './ActCardHeader'
import ActDescription from './ActDescription'
import OpinionsAndGradesCount from './OpinionsAndGradesCount'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ActCard = styled.div`
	border-radius: 96px;
	background-color: white;
`

const ItemHeaderDescription = styled.div`
	font-size: 16px;
	color: #a9b4cc;
	text-align: left;
`

const ReadMore = styled.button`
  background-color: #7F8799;
  height: 60px
  font-size: 18px;
  text-align: center;
  padding: 0 48px;
  margin: auto;
  margin-top: -80px;
  color: white;
  border-radius: 35px;
  position: relative;
  bottom: -30px;
  z-index: 2;
  cursor: pointer;
`

const NoOpinions = styled.div`
	font-size: 16px;
	margin: 42px 0px;
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

const ActAndOpinionPreview = ({ act, grade, companyId, location }) => {
	const first = 3
	return (
		<ActCard>
			<Query query={OPINION_FEED_QUERY} variables={{ companyId, act, first }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const opinionsFeed = data.opinionsFeed

					return (
						<div>
							<ActCardHeader act={act} grade={grade} location={location} />
							<ActDescription
								act={act}
								color="#a9b4cc"
								justifyContent="center"
							/>
							{opinionsFeed.length ? (
								<div>
									<Row justifyContent="center" mt={'12px'} mb={'42px'}>
										<Col md={10} textAlign="left">
											<ItemHeaderDescription>
												Un extrait des opinions qui ont été les plus utiles aux
												utilisateurs pour juger l'acte :
											</ItemHeaderDescription>
										</Col>
									</Row>
									<OpinionPreview
										act={act}
										companyId={companyId}
										location={location}
										opinionsFeed={opinionsFeed}
									/>
									<OpinionsAndGradesCount
										opinionsFeed={opinionsFeed}
										color="#a9b4cc"
									/>
									<Link to={`${location.pathname}act/${act}`}>
										<ReadMore>Voir les sources</ReadMore>
									</Link>
								</div>
							) : (
								<NoOpinions>
									<NoOpinions>
										Il n'y a pas encore d'opinion pour cet acte... :'(
									</NoOpinions>
									<Link to={`${location.pathname}act/${act}`}>
										<ReadMore>Ajouter une opinion</ReadMore>
									</Link>
								</NoOpinions>
							)}
						</div>
					)
				}}
			</Query>
		</ActCard>
	)
}

export default withRouter(ActAndOpinionPreview)
