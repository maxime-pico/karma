import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CAUSE_AND_ACTS } from '../constants.js'
import { convertGradesIntoColors } from '../utils'
import OpinionPreviewBloc from './OpinionPreviewBloc'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ItemIcon = styled.div`
	border-radius: 50%;
	overflow: hidden;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	background: url(${props => props.src}) no-repeat 15px 15px;
	background-color: ${props => convertGradesIntoColors(props.grade)};
	background-size: 38px, contain;
	margin: auto;
`
const ItemKarma = styled.div`
	font-size: 1.5em;
	font-weight: 600;
	color: #5d5c5c;
`
const ItemTitle = styled.div`
	font-size: 1.5em;
	font-weight: 600;
	color: #5d5c5c;
`
const ItemOpinions = styled.div`
	font-size: 1.5em;
	color: #5d5c5c;
`
const ItemDescription = styled.div`
	font-size: 1.2em;
	color: #5d5c5c;
`

const OPINIONS_COUNT_QUERY = gql`
	query OpinionsCountQuery($companyId: ID!, $identifier: Act!) {
		opinionsCount(companyId: $companyId, act: $identifier) {
			count
		}
	}
`

const ActPreview = ({ identifier, grade, companyId, location }) => {
	return (
		<Row justifyContent="center" textAlign="left" pl={4}>
			<Col md={1} textAlign="center">
				<ItemIcon
					src={process.env.PUBLIC_URL + `/icons/act/${identifier}.png`}
					size={65}
					alt={identifier}
					grade={grade}
				/>
				<ItemKarma>{grade !== null ? grade : 'N/A'}</ItemKarma>
			</Col>
			<Col pt={1}>
				<Link to={`${location.pathname}act/${identifier}`}>
					<ItemTitle>{CAUSE_AND_ACTS[identifier].fr}</ItemTitle>
				</Link>
				<Query
					query={OPINIONS_COUNT_QUERY}
					variables={{ companyId, identifier }}
				>
					{({ loading, error, data }) => {
						if (loading) return <div> Fetching </div>
						if (error) return <div> Error </div>
						const opinionsCountInt = data.opinionsCount.count
						return (
							<ItemOpinions>
								{opinionsCountInt} opinion
								{opinionsCountInt > 1 && 's'}
							</ItemOpinions>
							/* <div className="col"> tags </div> */
						)
					}}
				</Query>
				<ItemDescription>
					{CAUSE_AND_ACTS[identifier].description.fr}
				</ItemDescription>
			</Col>
			<OpinionPreviewBloc
				act={identifier}
				companyId={companyId}
				location={location}
			/>
		</Row>
	)
}

export default ActPreview
