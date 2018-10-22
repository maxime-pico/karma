import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'

// returns the description corresponding to the act or cause
const CauseAndActExplanation = ({ identifier }) => (
	<div className="row d-flex justify-content-center m-4">
		<div className="col-8">{CAUSE_AND_ACTS[identifier].description.fr}</div>
	</div>
)

export default CauseAndActExplanation
