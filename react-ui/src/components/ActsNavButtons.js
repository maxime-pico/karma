import React from 'react'

const ActsNavButtons = ({ _adjacentCause }) => (
	<div className="row d-flex justify-content-center">
		<div className="col-2">
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => _adjacentCause(-1)}
			>
				Cause precedente
			</button>
		</div>
		<div className="col-2">
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => _adjacentCause(1)}
			>
				Cause Suivante
			</button>
		</div>
	</div>
)

export default ActsNavButtons
