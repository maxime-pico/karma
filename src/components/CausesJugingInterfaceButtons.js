import React from 'react'

const CausesJugingInterfaceButtons = ({
	_adjacentCause,
	_stopGrading,
	cause,
	gradingMutation,
}) => {
	const _validateGrading = async () => {
		const reload = true
		await gradingMutation()
		_stopGrading(reload)
		return null
	}
	return (
		<div className="row mt-4 d-flex justify-content-center">
			{cause !== 'ENVIRONMENT' && (
				<div className="col-2 p-3">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => _adjacentCause(-1)}
					>
						Cause Précédente
					</button>
				</div>
			)}
			{cause === 'FISCAL' ? (
				<div className="col-2 p-3">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => _validateGrading()}
					>
						Valider mes notes
					</button>
				</div>
			) : (
				<div className="col-2 p-3">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => _adjacentCause(1)}
					>
						Cause Suivante
					</button>
				</div>
			)}
		</div>
	)
}

export default CausesJugingInterfaceButtons
