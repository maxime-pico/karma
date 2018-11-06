import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CAUSE_AND_ACTS } from '../constants.js'
import { convertGradesIntoColors } from '../utils'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ItemIcon = styled.div`
	border-radius: 50%;
	overflow: hidden;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	background: url(${props => props.src}) no-repeat 15px 15px;
	background-color: ${props => convertGradesIntoColors(props.grade)};
	background-size: 38px, contain;
`

const Text = styled(Col)`
	font-weight: 600;
	color: #5d5d5c;
	line-height: 1.3em;
`

const Grade = styled.div`
	font-size: 1.4em;
`

const Identifier = styled.div`
	font-size: 1em;
`

const Opinion = styled.div`
	font-weight: 400;
`

const OPINIONS_COUNT_QUERY = gql`
	query OpinionsCountQuery($companyId: ID!, $identifier: Act!) {
		opinionsCount(companyId: $companyId, act: $identifier) {
			count
		}
	}
`

const CauseCardAct = ({ identifier, grade, companyId }) => {
	return (
		<Row alignItems="center" my={2}>
			<Col md={3}>
				<ItemIcon
					src={process.env.PUBLIC_URL + `/icons/act/${identifier}.png`}
					alt={identifier}
					size={65}
					grade={grade}
				/>
			</Col>
			<Text>
				<Grade>{grade !== null ? grade : 'N/A'}</Grade>
				<Identifier>{CAUSE_AND_ACTS[identifier].fr}</Identifier>
				<Query
					query={OPINIONS_COUNT_QUERY}
					variables={{ companyId, identifier }}
				>
					{({ loading, error, data }) => {
						if (loading) return <div> Fetching </div>
						if (error) return <div> Error </div>
						const opinionsCountInt = data.opinionsCount.count
						return (
							<Opinion>
								{opinionsCountInt} opinion
								{opinionsCountInt > 1 && 's'}
							</Opinion>
						)
					}}
				</Query>
			</Text>
		</Row>
	)
}

export default CauseCardAct
