import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'

const CauseCardTitle = ({ identifier }) => {
	return (
		<div className="row">
			<div className="col">
				<img
					src={process.env.PUBLIC_URL + `/icons/cause/${identifier}.png`}
					alt={identifier}
					width="50"
					height="50"
				/>
				{CAUSE_AND_ACTS[identifier].fr}
			</div>
		</div>
	)
}

export default CauseCardTitle
