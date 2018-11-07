import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { convertGradesIntoWords, convertGradesIntoColors } from '../utils'
import styled from 'styled-components'

const ItemText = styled.div`
	color: white;
	font-size: ${props => props.size};
	line-height: ${props => props.size}emm;
	margin: 10px 0;
`
const ItemKarma = styled.div`
	font-size: 0.9em;
`
const ItemIcon = styled.div`
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
`

const ItemOverview = ({ type, identifier, grade, big }) => {
	return (
		<div>
			<ItemIcon
				src={process.env.PUBLIC_URL + `/icons/${type}/${identifier}.png`}
				alt={identifier}
				size={big ? '80' : '33'}
				grade={grade}
			>
				<div className="icon" />
			</ItemIcon>
			<ItemText size={big ? '1.5em' : '1.1em'}>
				<div>{CAUSE_AND_ACTS[identifier].fr}</div>
				<ItemKarma style={{ fontWeight: '600' }}>
					{grade !== null ? grade : 'N/A'}
				</ItemKarma>
				<div>
					{grade !== null
						? convertGradesIntoWords(grade, type).fr
						: 'Pas de notes pour le moment'}
				</div>
			</ItemText>
		</div>
	)
}

export default ItemOverview
