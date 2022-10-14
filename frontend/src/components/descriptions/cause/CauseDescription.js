/*
  Component in charge of loading the description of a given cause
*/

//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../../../services/constants'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
const CauseTitle = styled.span`
	font-size: 1.4em;
	color: white;
`
// </STYLE>

type Props = {
	cause: string,
}

// Takes the cause and displays the relevant description
const CauseDescription = (props: Props) => {
	const { cause } = props
	return (
		<Row justifyContent="center" my={30}>
			<Col md={8}>
				<CauseTitle>{CAUSE_AND_ACTS[cause].description.fr}</CauseTitle>
			</Col>
		</Row>
	)
}

export default CauseDescription
