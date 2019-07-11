import React from 'react'
import styled from 'styled-components'

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

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
const HelpButton = ({ _openHelp }) => (
	<Bubble type="button" className="btn btn-primary" onClick={() => _openHelp()}>
		?
	</Bubble>
)

export default HelpButton
