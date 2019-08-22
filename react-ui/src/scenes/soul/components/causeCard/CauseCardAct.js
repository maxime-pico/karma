/*
  Component called by CauseCardActList in charge of displaying the act label
  as well as the corresponding grade for a given act
*/

//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../../../../services/constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
const Text = styled(Col)`
	color: #a9b4cc;
	font-size: 1em;
	text-align: ${props => props.align};
	@media (max-width: 540px) {
		text-align: center;
		font-size: 1.2em;
	}
`

const Identifier = styled.div`
	font-size: 1em;
`
// </STYLE>

// Declare types of expected props
type Props = {
	identifier: string,
	grade: number,
}

// CauseCardAct renders the information
const CauseCardAct = (props: Props) => {
	const { identifier, grade } = props
	return (
		<Row justifyContent="center" my={2}>
			<Text xs={12} sm={8} align="left">
				<Identifier>{CAUSE_AND_ACTS[identifier].fr}</Identifier>
			</Text>
			<Text xs={12} sm={2} align="right">
				{grade !== null ? grade : 'N/A'}
			</Text>
		</Row>
	)
}

export default CauseCardAct
