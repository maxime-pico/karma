import React from 'react'
import CauseCardAct from './CauseCardAct'

// Cause Card List calls call card act for each act in the object actgradesObject
const CauseCardActList = ({ actGradesObject, companyId }) => {
	return (
		<div className="row">
			<div className="col">
				{Object.keys(actGradesObject)
					.filter(identifier => identifier !== '__typename') // filter out the __typename field
					.map(identifier => (
						<CauseCardAct
							key={identifier}
							identifier={identifier}
							grade={actGradesObject[identifier]}
							companyId={companyId}
						/>
					))}
			</div>
		</div>
	)
}

export default CauseCardActList
