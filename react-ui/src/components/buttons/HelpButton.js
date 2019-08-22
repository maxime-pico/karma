/*
  Component called by Soul, Cause and Deliberation. Is the help button floating
  at the bottom right of the pages that contain a help interface
*/
// @flow
import React from 'react'
import styled from 'styled-components'

// <STYLE>
const Bubble = styled.button`
	color: #545a66;
	font-size: 24px;
	font-weight: 600;
	height: 60px;
	width: 60px;
	border-radius: 100%;
	overflow: hidden;
	background-color: white;
	margin: auto;
	padding-top: 7px;
	box-shadow: 2px 2px 4px 2px #00000026;
	position: fixed;
	bottom: 70px
	right: 64px;
	border: none;
	z-index: 1000;

	:hover {
		background-color: #d3e2ff;
	}
`
// </STYLE>

// Declare types of expected props
type Props = {
	_openHelp: () => any,
}

// Displays the bubble and reacts onclick
const HelpButton = (props: Props) => (
	<Bubble
		type="button"
		className="btn btn-primary help d-none d-md-block"
		onClick={() => props._openHelp()}
	>
		?
	</Bubble>
)

export default HelpButton
