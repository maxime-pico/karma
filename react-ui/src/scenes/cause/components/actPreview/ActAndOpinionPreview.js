/*
  Component called by ActAndOpinionPreviewList, in charge of setting up the 
  structure of an Act Card and loading the other components involved
*/
// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OpinionPreview from './OpinionPreview'
import ActCardHeader from './ActCardHeader'
import ActDescription from '../../../../components/descriptions/act/ActDescription'
import OpinionsAndGradesCount from '../../../../components/count/OpinionsAndGradesCount'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
const ActCard = styled.div`
	border-radius: 96px;
	background-color: white;
	text-align: center;
	@media (max-width: 540px) {
		border-radius: 0px;
	}
`

const ItemHeaderDescription = styled.div`
	color: #a9b4cc;
	text-align: left;
	font-size: 0.9em;
	@media (max-width: 540px) {
		font-size: 1.2em;
	}
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
  border: none;
`

const NoOpinions = styled.div`
	font-size: 16px;
	margin: 42px 0px;
	text-align: center;
`
// </STYLE>

//Preparing the query to load the first 3 opinions and display their preview
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

// Declaring props Type
/*
type Props = {
	act: string,
	grade: number,
	companyId: string,
	location: { pathname: string },
	tutorial: boolean,
}
*/

// Component gets all information to make the query and load the opinions to
// preview then dispatches the info in the relevant components or displays
// a generic message if no opinions were found for the act
const ActAndOpinionPreview = props => {
	const { act, grade, companyId, location, tutorial, _dataLoaded } = props
	const first = 3 //only fetch the first n opinions
	return (
		<ActCard>
			<Query
				query={OPINION_FEED_QUERY}
				variables={{ companyId, act, first }}
				onCompleted={_dataLoaded}
			>
				{({ loading, error, data }) => {
					if (loading) return <div> Loading... </div>
					if (error) return <div> Errorv: {error.message} </div>
					const opinionsFeed = data.opinionsFeed //opinionsFeed contains the first n opinions
					return (
						<div>
							<div className={tutorial ? 'act' : null}></div>
							<ActCardHeader act={act} grade={grade} location={location} />
							<ActDescription
								act={act}
								color="#a9b4cc"
								justifyContent="center"
							/>
							{opinionsFeed.length ? (
								<div>
									<Row
										justifyContent="center"
										textAlign="center"
										mt={'12px'}
										mb={'42px'}
									>
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
										tutorial={tutorial}
									/>
									<OpinionsAndGradesCount
										opinionsFeed={opinionsFeed}
										color="#a9b4cc"
									/>
									<Link to={`${location.pathname}act/${act}`}>
										<ReadMore className={tutorial && 'more'}>
											Voir toutes les opinions
										</ReadMore>
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
