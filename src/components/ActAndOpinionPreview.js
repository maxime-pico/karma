import React from 'react'
import ActPreview from './ActPreview'
import OpinionPreviewBloc from './OpinionPreviewBloc'

const ActAndOpinionPreview = ({ act, grade, companyId }) => (
	<div className="my-4">
		<ActPreview identifier={act} grade={grade} companyId={companyId} />
		<OpinionPreviewBloc act={act} companyId={companyId} />
	</div>
)

export default ActAndOpinionPreview
