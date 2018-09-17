import React from 'react'
import OpinionFeedPreview from './OpinionFeedPreview'

const OpinionPreviewBloc = ({ act, grade, companyId }) => (
	<div className="row my-3 d-flex align-items-center">
		<div className="col-8">
			<OpinionFeedPreview act={act} companyId={companyId} />
		</div>
		<div className="col">
			<button type="button" className="btn btn-secondary">
				Juger l'Acte
			</button>
		</div>
	</div>
)

export default OpinionPreviewBloc
