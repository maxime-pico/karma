//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../../services/constants'
import ItemOverview from './ItemOverview'
import { Link } from 'react-router-dom'
import { styled } from '@smooth-ui/core-sc'

// <STYLE>
const ListContainer = styled.div`
	@media (max-width: 540px) {
		margin-top: 24px;
	}
`

// </STYLE>
const OverviewList = ({ cause, grades, companyId }) => (
	<ListContainer className="causeList">
		{Object.keys(grades).map(
			identifier =>
				CAUSE_AND_ACTS[identifier] && (
					<div key={identifier}>
						<Link to={cause ? `act/${identifier}` : `cause/${identifier}`}>
							<ItemOverview
								identifier={identifier}
								grade={grades[identifier]}
							/>
						</Link>
					</div>
				),
		)}
	</ListContainer>
)

export default OverviewList
