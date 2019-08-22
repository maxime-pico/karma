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
const TitleCol = styled(Col)`
	text-align: ${props => props.align};
	@media (max-width: 540px) {
		text-align: center;
	}
`

const Title = styled.span`
	font-size: 26px;
	font-weight: 600;
`
// Color can be adapted
const RoundWindow = styled.div`
	height: 80px;
	width: 80px;
	border-radius: 80px;
	overflow: hidden;
	background-color: ${props => props.color};
	margin: auto;
	position: relative;
	top: -60px;
	img {
		height: 60%;
	}
	@media (max-width: 540px) {
		height: 100px;
		width: 100px;
		border-radius: 100px;
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
					<RoundWindow color={karmaColor}>
						<Push />
						<img
							src={process.env.PUBLIC_URL + `/icons/cause/${identifier}.png`}
							alt={identifier}
						/>
					</RoundWindow>
				</Col>
			</Row>
			<Row justifyContent="center" mt={'-40px'}>
				<TitleCol xs={10} sm={8} align="left">
					<Link to={`/company/${companyId}/cause/${identifier}`}>
						<Title>{CAUSE_AND_ACTS[identifier].fr}</Title>
					</Link>
				</TitleCol>
				<TitleCol xs={10} sm={2} align="right">
					<Title>{causeKarma}</Title>
				</TitleCol>
			</Row>
		</div>
	)
}

export default CauseCardTitle
