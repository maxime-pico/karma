import React from 'react'
import { styled } from '@smooth-ui/core-sc'

const Count = styled.div`
	font-size: 12px;
	color: ${props => props.color};
	margin-top: 42px;
`

const OpinionsAndGradesCount = ({ opinionsFeed, color }) => {
	var gradesCount = 0
	opinionsFeed.map(opinion => {
		gradesCount += opinion.affiliationsCount
	})

	return (
		<Count color={color}>
			{gradesCount} note
			{gradesCount > 1 ? 's' : null} basée
			{gradesCount > 1 ? 's' : null} sur {opinionsFeed.length} opinion
			{opinionsFeed.length > 1 ? 's' : null}
		</Count>
	)
}

export default OpinionsAndGradesCount
