import React from 'react'
import styled from 'styled-components'

const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`
const GradeButton = styled.button`
	height: 60px;
	width: 60px;
	border-radius: 100%;
	overflow: hidden;
	background-color: #545a66;
	margin: auto;
	box-shadow: 2px 2px 4px 2px #00000026;
	position: fixed;
	bottom: 140px;
	right: 64px;
	border: none;
	z-index: 1000;
	img {
		width: 35px;
	}

	:hover {
		background-color: #d3e2ff;
	}
`

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
const GradeKarmaButton = ({ _startGrading }) => (
	<GradeButton
		type="button"
		className="btn btn-primary grade"
		onClick={() => _startGrading()}
	>
		<Push />
		<img
			src={process.env.PUBLIC_URL + '/icons/gradekarmabutton.png'}
			alt="grading hammer"
		/>
	</GradeButton>
)

export default GradeKarmaButton
