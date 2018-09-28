import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
				<div className="row my-3 d-flex justify-content-center">
					<div className="col-6 text-center">
						<button
							type="button"
							className="btn btn-primary"
							onClick={async () => _submit(GradingMutation)}
						>
							Juger l'Acte
						</button>
					</div>
				</div>
			)}
		</Mutation>
	)
}

export default ActJudgingInterfaceFormSubmit
