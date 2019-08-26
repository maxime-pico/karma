/*
  Bubble button displayed on the bottom right that launches the grading scenarios
  in the corresponding scenes: Soul, Cause and Deliberation.
*/

// @flow
import React from 'react'
import styled from 'styled-components'

// <STYLE>
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
// </STYLE>

type Props = {
	_startGrading: () => any,
}

// Gets the even handler provided by the scene and attaches it to the button
const GradeKarmaButton = (props: Props) => (
	<GradeButton
		type="button"
		className="btn btn-primary grade d-none d-md-block"
		onClick={() => props._startGrading()}
	>
		<Push />
		<img
			src={process.env.PUBLIC_URL + '/icons/gradekarmabutton.svg'}
			alt="grading hammer"
			width="34"
			height="32"
		/>
	</GradeButton>
)

export default GradeKarmaButton
