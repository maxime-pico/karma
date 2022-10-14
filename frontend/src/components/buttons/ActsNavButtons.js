// Component not used at the moment. Used to provide navigation buttons to jump
// from one act to another
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

const ActsNavButtons = ({ _adjacentCause }) => (
	<Row justifyContent="center" my={2}>
		<Col md={3} pr={3} textAlign="right">
			<NavButtons
				type="button"
				className="btn btn-secondary"
				onClick={() => _adjacentCause(-1)}
			>
				Cause precedente
			</NavButtons>
		</Col>
		<Col md={3} pl={3} textAlign="left">
			<NavButtons
				type="button"
				className="btn btn-secondary"
				onClick={() => _adjacentCause(1)}
			>
				Cause Suivante
			</NavButtons>
		</Col>
	</Row>
)

export default ActsNavButtons
