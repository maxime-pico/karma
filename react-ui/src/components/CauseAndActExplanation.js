import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ActDescription = styled.span`
	font-size: 1.4em;
	color: #ababab;
`

// returns the description corresponding to the act or cause
const CauseAndActExplanation = ({ identifier, color }) => {
	const style = color ? { color: color } : { color: 'black' }
	return (
		<Row justifyContent="center" m={4}>
			<Col md={8} style={style}>
				<ActDescription>
					{CAUSE_AND_ACTS[identifier].description.fr}
				</ActDescription>
			</Col>
		</Row>
	)
}

export default CauseAndActExplanation
