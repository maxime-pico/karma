import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const CancelButton = styled.button`
	background-color: white;
	border-radius: 35px;
	border: 1px solid #d8d8d8;
	padding: 10px 40px;
	font-size: 20px;
	color: #7f8799;

	:hover {
		color: white;
		background: #a9b4cc;
		border-color: transparent;
	}
`

const GradeButton = styled.button`
	background-color: #a9b4cc;
	border-radius: 35px;
	border: none;
	padding: 10px 40px;
	font-size: 20px;
	color: white;
	white-space: normal;
	max-width: 100%;

	:hover {
		color: #a9b4cc;
		background: #d3e2ff;
	}
	&.btn-secondary {
		background: #7f8799;
	}
`

const GRADING_MUTATION = gql`
	mutation GradingMutation(
		$companyId: ID!
		$grade: Int!
		$act: Act!
		$opinionId: ID
		$opinionSources: [String]
		$opinionTags: [String]
		$opinionText: String
		$opinionTitle: String
		$newOpinion: Boolean!
	) {
		gradeAct(
			companyId: $companyId
			grade: $grade
			act: $act
			opinionId: $opinionId
			opinionSources: $opinionSources
			opinionTags: $opinionTags
			opinionText: $opinionText
			opinionTitle: $opinionTitle
			newOpinion: $newOpinion
		) {
			id
		}
	}
`

const ActJudgingInterfaceFormSubmit = ({
	_checkFields,
	_closeModal,
	title,
	text,
	sources,
	tags,
	opinionId,
	newOpinion,
	grade,
	companyId,
	act,
}) => {
	const _submit = async GradingMutation => {
		if (opinionId) {
			await GradingMutation()
			window.location.reload()
		} else {
			const newOpinionIsValid = await _checkFields()
			if (newOpinionIsValid) {
				await GradingMutation()
				window.location.reload()
			}
		}
	}

	const variables = {
		companyId: companyId,
		grade: grade,
		act: act,
		opinionSources: null,
		opinionTags: null,
		opinionText: null,
		opinionTitle: null,
		opinionId: null,
		newOpinion: false,
	}

	if (opinionId) {
		variables.opinionId = opinionId
	} else {
		variables.opinionTitle = title
		variables.opinionText = text
		variables.opinionSources = sources
		variables.opinionTags = tags
		variables.newOpinion = true
	}

	return (
		<Mutation mutation={GRADING_MUTATION} variables={variables}>
			{GradingMutation => (
				<Row justifyContent="center">
					<Col md={6} textAlign="right">
						<CancelButton onClick={_closeModal}> Annuler </CancelButton>
					</Col>
					<Col md={6} textAlign="left">
						<GradeButton
							type="button"
							className="btn btn-primary"
							onClick={async () => _submit(GradingMutation)}
						>
							Valider
						</GradeButton>
					</Col>
				</Row>
			)}
		</Mutation>
	)
}

export default ActJudgingInterfaceFormSubmit
