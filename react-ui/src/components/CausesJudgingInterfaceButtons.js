import React from 'react'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const NavButtons = styled.button`
	font-size: 1.5em;
	color: #989898;
	background-color: white;
	box-shadow: 3px 5px 18px #9c9c9c;
	border-radius: 30px;
	border: none;

	:hover,
	:focus:hover {
		box-shadow: 0px 0px 32px white;
		background-color: white;
		color: #a2a2a2;
	}
	&.confirm {
		background-color: #bde8ff;
		color: #525252;
	}
`

const CausesJudgingInterfaceButtons = ({
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
		<Row mt={4} justifyContent="center">
			{cause !== 'ENVIRONMENT' && (
				<Col md={2} p={3}>
					<NavButtons
						type="button"
						className="btn btn-secondary"
						onClick={() => _adjacentCause(-1)}
					>
						Cause Précédente
					</NavButtons>
				</Col>
			)}
			{cause === 'FISCAL' ? (
				<Col md={2} p={3}>
					<NavButtons
						type="button"
						className="btn confirm"
						onClick={() => _validateGrading()}
					>
						Valider mes notes
					</NavButtons>
				</Col>
			) : (
				<Col md={2} p={3}>
					<NavButtons
						type="button"
						className="btn btn-secondary"
						onClick={() => _adjacentCause(1)}
					>
						Cause Suivante
					</NavButtons>
				</Col>
			)}
		</Row>
	)
}

export default CausesJudgingInterfaceButtons
