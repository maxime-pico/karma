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
			to left,
			#85d8e6,
			#85d8e6 16.36%,
			#b3d7f2 30.36%,
			#add5f3 39.8%,
			#c1bddf 50%,
			#c34c58 71.69%,
			#d02417 92%,
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
