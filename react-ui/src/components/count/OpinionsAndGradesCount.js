/*
  Component in charge of displaying the number of grades and opinions, based
  on the opinionsFeed provided
*/
// @flow

import React from 'react'
import { styled } from '@smooth-ui/core-sc'

// <STYLE>
const Count = styled.div`
	font-size: 12px;
	color: ${props => props.color};
	margin-top: 42px;
	@media (max-width: 540px) {
		font-size: 1em;
	}
`
// </STYLE>

// Declaring props type
type Props = {
	opinionsFeed: Array<{ affiliationsCount: number }>,
	color: string,
}

// OpinionsAndGradesCount takes the list of opinions as props and displays the
// relevant information in the correct color
const OpinionsAndGradesCount = (props: Props) => {
	const { opinionsFeed, color } = props
	var gradesCount = 0
	opinionsFeed.forEach(opinion => {
		gradesCount += opinion.affiliationsCount
	})

	return (
		<Count color={color}>
			<span className="opinioncount">
				{gradesCount} note
				{gradesCount > 1 ? 's' : null} basée
				{gradesCount > 1 ? 's' : null} sur {opinionsFeed.length} opinion
				{opinionsFeed.length > 1 ? 's' : null}
			</span>
		</Count>
	)
}

export default OpinionsAndGradesCount
