import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { Row, Col } from '@smooth-ui/core-sc'

// returns the description corresponding to the act or cause
const CauseAndActExplanation = ({ identifier, color }) => {
	const style = color ? { color: color } : { color: 'black' }
	return (
		<Row justifyContent="center" m={4}>
			<Col md={8} style={style}>
				{CAUSE_AND_ACTS[identifier].description.fr}
			</Col>
		</Row>
	)
}

export default CauseAndActExplanation
