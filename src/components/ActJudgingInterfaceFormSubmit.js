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
		const newOpinionIsValid = await _checkFields()
		if (newOpinionIsValid) {
			GradingMutation()
		}
	}
	return (
		<Mutation
			mutation={GRADING_MUTATION}
			variables={{
				companyId: companyId,
				grade: grade,
				act: act,
				opinionSources: sources,
				opinionTags: tags,
				opinionText: text,
				opinionTitle: title,
				opinionId: opinionId,
				newOpinion: newOpinion,
			}}
		>
			{GradingMutation => (
				<div className="row my-2 d-flex justify-content-center">
					<div className="col-6 text-left">
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
