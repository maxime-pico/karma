//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import ItemOverview from './ItemOverview'
import { Link } from 'react-router-dom'

const OverviewList = ({ grades, type, mode, companyId }) => (
	<div>
		{Object.keys(grades).map(
			identifier =>
				CAUSE_AND_ACTS[identifier] && (
					<div key={identifier}>
						<Link to={`act/${identifier}`}>
							<ItemOverview
								big={identifier === mode}
								type={type}
								identifier={identifier}
								grade={grades[identifier]}
							/>
						</Link>
					</div>
				),
		)}
	</div>
)

export default OverviewList
