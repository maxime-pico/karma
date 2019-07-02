import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
//import { convertGradesIntoWords, convertGradesIntoColors } from '../utils'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ItemLine = styled(Row)`
	color: white;
	font-size: 18px;
	line-height: 24px;
	margin-bottom: 10px;
`

const ItemText = styled.div`
	text-align: left;
`
const ItemKarma = styled.div`
	font-size: 18px;
	text-align: right;
`
/* const ItemIcon = styled.div`
	margin: auto;
	height: calc(${props => props.size}px + 40px);
	width: calc(${props => props.size}px + 42px);
	border-radius: 46%;
	border: 10px solid white;
	overflow: hidden;
	background-color: ${props => convertGradesIntoColors(props.grade)};
	box-shadow: 2px 2px 29px #909090b8;

	.icon {
		display: inline-block;
		height: 100%;
		vertical-align: middle;
		width: ${props => props.size}px;
		background: url(${props => props.src}) no-repeat 0px 10px;
		background-size: contain;
		margin: auto;
	}
`*/

const ItemOverview = ({ type, identifier, grade, big }) => {
	return (
		<ItemLine>
			<Col md={9}>
				{/*			<ItemIcon
				src={process.env.PUBLIC_URL + `/icons/${type}/${identifier}.png`}
				alt={identifier}
				size={big ? '80' : '33'}
				grade={grade}
			>
			<div className="icon" />
			</ItemIcon> */}
				<ItemText size={big ? '1.5em' : '1.1em'}>
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
