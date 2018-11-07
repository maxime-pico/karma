import React from 'react'
import OpinionFeedPreview from './OpinionFeedPreview'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const GradeButton = styled.button`
	font-size: 2em;
	line-height: 3em;
	padding: 0 15px;
	color: white;
	text-transform: uppercase;
	background: linear-gradient(
		to right,
		#85d8e6,
		#b3d7f2 22.14%,
		#baacd4 41.51%,
		#af8cc0 56.2%,
		#d02417 98.46%,
		#d02417
	);
	box-shadow: 0px 0px 32px #ada9a98c;
	border-radius: 45px;
	border: none;
	cursor: pointer;

	:hover {
		background: white;
		color: grey;
	}
`

const OpinionPreviewBloc = ({ act, grade, companyId, location }) => (
	<Row my={3} alignItems="center">
		<Col md={9}>
			<OpinionFeedPreview
				act={act}
				companyId={companyId}
				first={2}
				location={location}
			/>
		</Col>
		<Col>
			<Link
				to={{
					pathname: `${location.pathname}act/${act}`,
					state: {
						startGrading: true,
						grading: true,
					},
				}}
			>
				<GradeButton type="button">Juger l'Acte</GradeButton>
			</Link>
		</Col>
	</Row>
)

export default OpinionPreviewBloc
