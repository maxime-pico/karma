import React from 'react'
import ActPreview from './ActPreview'
import OpinionPreviewBloc from './OpinionPreviewBloc'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const ActAndOpinionPreview = ({ act, grade, companyId, location }) => (
	<div className="my-4">
		<Link to={`${location.pathname}act/${act}`}>
			<ActPreview identifier={act} grade={grade} companyId={companyId} />
		</Link>
		<OpinionPreviewBloc act={act} companyId={companyId} />
	</div>
)

export default withRouter(ActAndOpinionPreview)
