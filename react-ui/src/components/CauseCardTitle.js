import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Title = styled.span`
	font-size: 1.45em;
	font-weight: 600;
	line-height: 1em;
`

const CauseCardTitle = ({ identifier }) => {
	return (
		<Row alignItems="center">
			<Col md={3} omd={1}>
				<img
					src={process.env.PUBLIC_URL + `/icons/cause/${identifier}.png`}
					alt={identifier}
					height="50"
				/>
			</Col>
			<Col textAlign="left">
				<Title>{CAUSE_AND_ACTS[identifier].fr}</Title>
			</Col>
		</Row>
	)
}

export default CauseCardTitle
