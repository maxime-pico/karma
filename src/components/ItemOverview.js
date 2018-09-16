import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { convertGradesIntoWords } from '../utils'

const ItemOverview = ({ type, identifier, grade, big }) => {
	return (
		<div>
			<img
				src={process.env.PUBLIC_URL + `/icons/${type}/${identifier}.png`}
				alt={identifier}
				width={big ? '100' : '50'}
				height={big ? '100' : '50'}
			/>
			<div>{CAUSE_AND_ACTS[identifier].fr}</div>
			<div>{grade}</div>
			<div>{convertGradesIntoWords(grade, type).fr}</div>
		</div>
	)
}

export default ItemOverview
