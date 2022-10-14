import React from 'react'
import { CAUSE_AND_ACTS } from '../../services/constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ItemLine = styled(Row)`
	color: white;
	font-size: 18px;
	line-height: 24px;
	margin-bottom: 10px;
	@media (max-width: 540px) {
		margin-bottom: 18px;
	}
`

const ItemText = styled.div`
	text-align: left;
	font-size: 1.1em;
	@media (max-width: 540px) {
		text-align: center;
	}
`
const ItemKarma = styled.div`
	font-size: 1.1em;
	text-align: right;
	@media (max-width: 540px) {
		text-align: center;
	}
`
const ItemOverview = ({ identifier, grade }) => {
	return (
		<ItemLine>
			<Col sm={9} xs={12}>
				<ItemText>
					<div>{CAUSE_AND_ACTS[identifier].fr}</div>
				</ItemText>
			</Col>
			<Col sm={3} xs={12}>
				<ItemKarma>{grade !== null ? grade : 'N/A'}</ItemKarma>
			</Col>
		</ItemLine>
	)
}

export default ItemOverview
