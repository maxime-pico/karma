// Component not used at the moment
/*
  Component in charge of loading the description of a given cause or act
*/
// @flow

import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
const ActDescription = styled.span`
	font-size: 1.4em;
	color: #ababab;
`
// </STYLE>

// Declaring props type
type Props = {
	identifier: string,
	color: string,
}

// returns the description corresponding to the act or cause
const CauseAndActExplanation = (props: Props) => {
	const { identifier, color } = props
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
