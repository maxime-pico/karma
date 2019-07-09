import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Text = styled(Col)`
	color: #a9b4cc;
	font-size: 18px;
	line-height: 22px;
`

const Identifier = styled.div`
	font-size: 1em;
`

const CauseCardAct = ({ identifier, grade, companyId }) => {
	return (
		<Row justifyContent="center" my={2}>
			<Text md={8}>
				<Identifier>{CAUSE_AND_ACTS[identifier].fr}</Identifier>
			</Text>
			<Text md={2} textAlign="right">
				{grade !== null ? grade : 'N/A'}
			</Text>
		</Row>
	)
}

export default CauseCardAct
