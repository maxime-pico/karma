import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CAUSE_AND_ACTS } from '../constants.js'

const style = {
	margin: 'auto',
}

const OPINIONS_COUNT_QUERY = gql`
	query OpinionsCountQuery($companyId: ID!, $identifier: Act!) {
		opinionsCount(companyId: $companyId, act: $identifier) {
			count
		}
	}
`

const CauseCardAct = ({ identifier, grade, companyId }) => {
	return (
		<div className="row">
			<div className="col-4">
				<img
					src={process.env.PUBLIC_URL + `/icons/act/${identifier}.png`}
					width="50"
					height="50"
					alt={identifier}
				/>
			</div>
			<div className="col">
				<div>{grade ? grade : 'N/A'}</div>
				<div>{CAUSE_AND_ACTS[identifier].fr}</div>
				<Query
					query={OPINIONS_COUNT_QUERY}
					variables={{ companyId, identifier }}
				>
					{({ loading, error, data }) => {
						if (loading) return <div> Fetching </div>
						if (error) return <div> Error </div>
						const opinionsCountInt = data.opinionsCount.count
						return (
							<div>
								{opinionsCountInt} opinion
								{opinionsCountInt > 1 && 's'}
							</div>
						)
					}}
				</Query>
			</div>
		</div>
	)
}

export default CauseCardAct
