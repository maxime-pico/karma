import React from 'react'
import { CAUSE_AND_ACTS } from '../../services/constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ItemLine = styled(Row)`
	color: white;
	font-size: 18px;
	line-height: 24px;
	margin-bottom: 10px;
`

const ItemText = styled.div`
	text-align: left;
	font-size: 18px;
`
const ItemKarma = styled.div`
	font-size: 18px;
	text-align: right;
`
const ItemOverview = ({ identifier, grade }) => {
	return (
		<ItemLine>
			<Col md={9}>
				<ItemText>
					<div>{CAUSE_AND_ACTS[identifier].fr}</div>
				</ItemText>
			</Col>
			<Col>
				<ItemKarma>{grade !== null ? grade : 'N/A'}</ItemKarma>
			</Col>
		</ItemLine>
	)
}

export default ItemOverview
