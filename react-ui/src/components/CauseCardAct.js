import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
// import { convertGradesIntoColors } from '../utils'
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

/*const ItemIcon = styled.div`
	border-radius: 50%;
	overflow: hidden;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	background: url(${props => props.src}) no-repeat 15px 15px;
	background-color: ${props => convertGradesIntoColors(props.grade)};
	background-size: 38px, contain;
`*/

const Text = styled(Col)`
	color: #a9b4cc;
	font-size: 18px;
	line-height: 22px;
`

const Identifier = styled.div`
	font-size: 1em;
`
{
	/*const OPINIONS_COUNT_QUERY = gql`
	query OpinionsCountQuery($companyId: ID!, $identifier: Act!) {
		opinionsActCount(companyId: $companyId, act: $identifier) {
			count
		}
	}
`*/
}

const CauseCardAct = ({ identifier, grade, companyId }) => {
	return (
		<Row justifyContent="center" my={2}>
			{/*<Col md={3}>
				<ItemIcon
					src={process.env.PUBLIC_URL + `/icons/act/${identifier}.png`}
					alt={identifier}
					size={65}
					grade={grade}
				/>
			</Col>*/}
			<Text md={8}>
				<Identifier>{CAUSE_AND_ACTS[identifier].fr}</Identifier>
			</Text>
			<Text md={2} textAlign="right">
				{grade !== null ? grade : 'N/A'}
			</Text>
			{/*<Query query={OPINIONS_COUNT_QUERY} variables={{ companyId, identifier }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const opinionsCountInt = data.opinionsActCount.count
					return (
						<div>
							{opinionsCountInt} opinion
							{opinionsCountInt > 1 && 's'}
						</div>
					)
				}}
			</Query>*/}
		</Row>
	)
}

export default CauseCardAct
