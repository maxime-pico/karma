/*
 Component called by CauseCard and in charge of expanding the list of act
 grades for a given cause into separate elements that display the info through
 the CauseCardAct component.
*/
// @flow
import React from 'react'
import CauseCardAct from './CauseCardAct'
import { Row, Col } from '@smooth-ui/core-sc'

// Declare types of expected props
type Props = {
	actGradesObject: {},
}

// Cause Card List calls card act for each act in the object actgradesObject
const CauseCardActList = (props: Props) => {
	const { actGradesObject } = props
	return (
		<Row textAlign="left">
			<Col>
				{// for each valid label inside the object, call CauseCardAct with
				// corresponing variables

				Object.keys(actGradesObject)
					.filter(identifier => identifier !== '__typename') // filter out the __typename field
					.map((identifier, i) => (
						<CauseCardAct
							key={i}
							identifier={identifier}
							grade={actGradesObject[identifier]}
						/>
					))}
			</Col>
		</Row>
	)
}

export default CauseCardActList
