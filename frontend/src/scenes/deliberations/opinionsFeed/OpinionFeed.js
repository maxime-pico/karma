import React from 'react'
import Opinion from '../../../components/opinion/Opinion'
import { Row, styled } from '@smooth-ui/core-sc'

const DefaultText = styled.span`
	font-size: 1.8rem;
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
						tutorial={index === 0}
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
