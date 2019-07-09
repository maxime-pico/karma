import React from 'react'
import CauseCardAct from './CauseCardAct'
import { Row, Col } from '@smooth-ui/core-sc'

// Cause Card List calls call card act for each act in the object actgradesObject
const CauseCardActList = ({ actGradesObject, companyId }) => {
	return (
		<Row textAlign="left">
			<Col>
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
			</Col>
		</Row>
	)
}

export default CauseCardActList
