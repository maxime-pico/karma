import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CAUSE_AND_ACTS } from '../constants.js'

const OPINIONS_COUNT_QUERY = gql`
	query OpinionsCountQuery($companyId: ID!, $identifier: Act!) {
		opinionsCount(companyId: $companyId, act: $identifier) {
			count
		}
	}
`

const ActPreview = ({ identifier, grade, companyId }) => {
	return (
		<div className="row d-flex justify-content-left text-left">
			<div className="col-2 text-center">
				<div className="row">
					<div className="col">
						<img
							src={process.env.PUBLIC_URL + `/icons/act/${identifier}.png`}
							width="50"
							height="50"
							alt={identifier}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">{grade ? grade : 'N/A'}</div>
				</div>
			</div>
			<div className="col">
				<div className="row">{CAUSE_AND_ACTS[identifier].fr}</div>
				<Query
					query={OPINIONS_COUNT_QUERY}
					variables={{ companyId, identifier }}
				>
					{({ loading, error, data }) => {
						if (loading) return <div> Fetching </div>
						if (error) return <div> Error </div>
						const opinionsCountInt = data.opinionsCount.count
						return (
							<div className="row d-flex justify-content-left">
								<div className="col-4 p-0">
									{opinionsCountInt} opinion
									{opinionsCountInt > 1 && 's'}
								</div>
								{/* <div className="col"> tags </div> */}
							</div>
						)
					}}
				</Query>
				<div className="row">{CAUSE_AND_ACTS[identifier].description.fr}</div>
			</div>
		</div>
	)
}

export default ActPreview
