/*
Component called by CauseCard and in charge of displaying the upper part of the
Cause card: logo (with correct color), title and link
*/

// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { CAUSE_AND_ACTS } from '../../../../services/constants'
import { convertGradesIntoColors } from '../../../../services/utils'
import { Row, Col, styled } from '@smooth-ui/core-sc'

//<STYLE>
const Title = styled.span`
	font-size: 26px;
	font-weight: 600;
	color: #7f8799;
`
// Size and color can be adapted
const RoundWindow = styled.div`
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: ${props => props.color};
	margin: auto;
	position: relative;
	top: -60px;
	img {
		height: 60%;
	}
`

const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`
// </STYLE>

// Declare types of expected props
type Props = {
	companyId: string,
	causeKarma: number,
	identifier: string,
}

const CauseCardTitle = (props: Props) => {
	const { identifier, companyId, causeKarma } = props
	const karmaColor = convertGradesIntoColors(causeKarma)
	return (
		<div>
			<Row justifyContent="center">
				<Col md={4}>
					<RoundWindow size={80} color={karmaColor}>
						<Push />
						<img
							src={process.env.PUBLIC_URL + `/icons/cause/${identifier}.png`}
							alt={identifier}
						/>
					</RoundWindow>
				</Col>
			</Row>
			<Row justifyContent="center" mt={'-40px'}>
				<Col md={8} textAlign="left">
					<Link to={`/company/${companyId}/cause/${identifier}`}>
						<Title>{CAUSE_AND_ACTS[identifier].fr}</Title>
					</Link>
				</Col>
				<Col md={2} textAlign="right">
					<Title>{causeKarma}</Title>
				</Col>
			</Row>
		</div>
	)
}

export default CauseCardTitle
