import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { styled } from '@smooth-ui/core-sc'

const Count = styled.div`
	color: white;
	font-size: 0.7em;
	line-height: 1.2em;
	text-align: center;
	@media (max-width: 540px) {
		font-size: 1em;
	}
`

const OPINIONS_COUNT_QUERY = gql`
	query OpinionsAndGradesCauseCount($companyId: ID!, $identifier: Cause!) {
		opinionsAndGradesCauseCount(companyId: $companyId, cause: $identifier) {
			opinionsCount
			gradesCount
		}
	}
`

const CauseGradesCount = ({ companyId, identifier }) => {
	return (
		<Query query={OPINIONS_COUNT_QUERY} variables={{ companyId, identifier }}>
			{({ loading, error, data }) => {
				if (loading) return <div> Fetching </div>
				if (error) return <div> Error {console.log(error)}</div>
				const opinionsCountInt = data.opinionsAndGradesCauseCount.opinionsCount
				const gradesCountInt = data.opinionsAndGradesCauseCount.gradesCount
				return (
					<Count>
						{gradesCountInt} notes basées sur
						{' ' + opinionsCountInt} opinion
						{opinionsCountInt > 1 && 's'}
					</Count>
				)
			}}
		</Query>
	)
}

export default CauseGradesCount
