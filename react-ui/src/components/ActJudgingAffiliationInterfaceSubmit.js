import React from 'react'
import PandaSlider from './PandaSlider'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const CancelButton = styled.button`
	border-radius: 35px;
	background-color: transparent;
	border: 1px solid #d8d8d8;
	padding: 10px 40px;
	font-size: 16px;
	color: white;

	:hover {
		color: #d8d8d8;
		background: #a9b4cc;
		border-color: transparent;
	}
`

const GradeButton = styled.button`
	background-color: #a9b4cc;
	border-radius: 35px;
	border: none;
	padding: 10px 40px;
	font-size: 16px;
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

const ActJudgingAffiliationInterfaceSubmit = ({
	_closeModal,
	_updateGrade,
	opinionId,
	grade,
	companyId,
	act,
}) => {
	const _submit = async GradingMutation => {
		if (opinionId) {
			await GradingMutation()
			window.location.reload()
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
		opinionId: opinionId,
		newOpinion: false,
	}

	return (
		<Mutation mutation={GRADING_MUTATION} variables={variables}>
			{GradingMutation => (
				<Row justifyContent="center">
					<Col textAlign="right" pr="42px">
						<CancelButton onClick={_closeModal}> Annuler </CancelButton>
					</Col>
					<Col md={3} mt="6px">
						<PandaSlider
							identfier={act}
							karma={grade}
							type={'global'}
							disabled={false}
							_updateGrade={_updateGrade}
							_setGrade={_updateGrade}
						/>
					</Col>
					<Col textAlign="left" pl="42px">
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

export default ActJudgingAffiliationInterfaceSubmit
