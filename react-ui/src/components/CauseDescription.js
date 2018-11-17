import React from 'react'
import { CAUSE_AND_ACTS } from '../constants'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const CauseTitle = styled.span`
	font-size: 1.4em;
	color: white;
`

const CauseDescription = ({ cause }) => {
	return (
		<Row justifyContent="center" my={30}>
			<Col md={8}>
				<CauseTitle>{CAUSE_AND_ACTS[cause].description.fr}</CauseTitle>
			</Col>
		</Row>
	)
}

export default CauseDescription
