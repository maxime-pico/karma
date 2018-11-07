import React from 'react'
import styled from 'styled-components'

const GradeButton = styled.button`
	font-size: 2em;
	color: #989898;
	background-color: white;
	box-shadow: 0px 0px 32px #ada9a98c;
	border-radius: 30px;
	border: none;

	:hover {
		background: linear-gradient(
			to right,
			#85d8e6,
			#b3d7f2 22.14%,
			#baacd4 41.51%,
			#af8cc0 56.2%,
			#d02417 98.46%,
			#d02417
		);
	}
`

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
const GradeKarmaButton = ({ label, _startGrading }) => (
	<GradeButton
		type="button"
		className="btn btn-primary"
		onClick={() => _startGrading()}
	>
		{label}
	</GradeButton>
)

export default GradeKarmaButton
