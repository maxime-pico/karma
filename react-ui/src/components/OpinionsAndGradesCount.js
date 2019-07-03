import React from 'react'
import OpinionPreview from './OpinionPreview'
import { Link } from 'react-router-dom'
import { Grid, styled } from '@smooth-ui/core-sc'

const Count = styled.div`
	font-size: 12px;
	color: #a9b4cc;
	margin-top: 42px;
`

const OpinionsAndGradesCount = ({ opinionsFeed }) => {
	var gradesCount = 0
	opinionsFeed.map(opinion => {
		gradesCount += opinion.affiliationsCount
	})

	return (
		<Count>
			{gradesCount} note
			{gradesCount > 1 ? 's' : null} basée
			{gradesCount > 1 ? 's' : null} sur {opinionsFeed.length} opinion
			{opinionsFeed.length > 1 ? 's' : null}
		</Count>
	)
}

export default OpinionsAndGradesCount
