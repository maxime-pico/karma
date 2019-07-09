import React from 'react'
import Opinion from './Opinion'
import { Row, styled } from '@smooth-ui/core-sc'

const DefaultText = styled.span`
	color: #7f8799;
	font-size: 18px;
`

const OpinionFeed = ({
	act,
	companyId,
	grading,
	affiliation,
	opinionsFeed,
	step,
	_selectOpinion,
}) => {
	return (
		<Row justifyContent="left">
			{opinionsFeed.length ? (
				opinionsFeed.map((opinion, index) => (
					<Opinion
						key={index}
						opinion={opinion}
						affiliation={affiliation}
						grading={grading}
						step={step}
						_selectOpinion={_selectOpinion}
					/>
				))
			) : (
				<DefaultText>
					Il n'y a pas encore d'opinions pour cet Acte {":'("}
				</DefaultText>
			)}
		</Row>
	)
}

export default OpinionFeed
