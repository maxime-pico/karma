import React from 'react'
import OpinionFeedPreview from './OpinionFeedPreview'
import { Link } from 'react-router-dom'

const OpinionPreviewBloc = ({ act, grade, companyId, location }) => (
	<div className="row my-3 d-flex align-items-center">
		<div className="col-8">
			<OpinionFeedPreview
				act={act}
				companyId={companyId}
				first={2}
				location={location}
			/>
		</div>
		<div className="col">
			<Link
				to={{
					pathname: `${location.pathname}act/${act}`,
					state: {
						startGrading: true,
						grading: true,
					},
				}}
			>
				<button type="button" className="btn btn-secondary">
					Juger l'Acte
				</button>
			</Link>
		</div>
	</div>
)

export default OpinionPreviewBloc
