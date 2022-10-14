import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonContainer = styled.div`
	text-align: center;
`
const Button = styled.button`
	font-size: 2rem;
	color: white;
	background-color: #7f8799;
	border-radius: 3.5rem;
	padding: 1.5rem 2.5rem;
	margin-top: 2.5rem;
	cursor: pointer;
	border: 0 none;
	transition: all cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s;

	:hover,
	:focus:hover {
		background-color: #444954;
	}

	img {
		margin-right: 7px;
	}

	${props =>
		props.ghost &&
		css`
			background: transparent;
			border: 2px solid #ecedf0;
			color: #7f8799;

			:hover {
				border-color: #444954;
				color: white;
			}
		`};
`

const CTAButton = props => (
	<ButtonContainer>
		<Link to={props.link}>
			<Button {...props}> {props.children} </Button>
		</Link>
	</ButtonContainer>
)

export default CTAButton
