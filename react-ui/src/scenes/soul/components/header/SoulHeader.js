// @flow
import React from 'react'
import {
	convertGradesIntoWords,
	convertGradesIntoColors,
} from '../../../../services/utils'
import CompanyOverview from '../../../../components/companyOverview/CompanyOverview'
import OverviewList from '../../../../components/karmaLists/OverviewList'
import CompanyGradesCount from './CompanyGradesCount'
import { Grid, Row, Col, styled } from '@smooth-ui/core-sc'

/* This component is a child of Soul, it is responsible for calling all the
components needed to display the top portion of the page containing the general
data about the company and cause grades */

// <STYLE>
// Use one style for label and value, align depending on conent
const KarmaDescription = styled.div`
	font-size: 36px;
	font-weight: 600;
	text-align: ${props => props.align};
	color: white;
`

// Change background color depending on the overall karma
const WaveHeader = styled(Grid)`
	padding-top: 72px;
	background-color: ${props => props.color};
	border-bottom-right-radius: 96px;
	::after {
		content: ' ';
		padding-bottom: 76px;
		padding-right: 86px;
		position: relative;
		bottom: -19px;
		left: -49%;
		background-color: #f7f7f7;
		border: solid ${props => props.color};
		border-width: 31px 0 0 31px;
		border-top-left-radius: 100px;
		z-index: -2;
	}
`
// </STYLE>

// Declare types of expected props
type Props = {
	companyId: string,
	overallKarma?: number, // karma here is the overall karma of the Soul Component
	type: string,
	causeGrades: {},
}

const SoulHeader = (props: Props) => {
	const { companyId, overallKarma, type, causeGrades } = props
	const karmaDescription = convertGradesIntoWords(overallKarma, type).fr
	const karmaColor = convertGradesIntoColors(overallKarma)

	return (
		<WaveHeader fluid color={karmaColor}>
			<Row justifyContent="center">
				<Col md={2}>
					<CompanyOverview companyId={companyId} />
				</Col>
				<Col md={7}>
					<Row mb={'12px'}>
						<Col md={9}>
							<KarmaDescription align={'left'}>
								<span className="karma">
										{overallKarma === null ? 'N/A' : overallKarma}
									</span>
							</KarmaDescription>
						</Col>
						<Col md={3}>
							<KarmaDescription align={'right'}>
								{// if overallKarma is undefined (no grades yet) the display 'N/A' instead
								overallKarma === null ? 'N/A' : overallKarma}
							</KarmaDescription>
						</Col>
					</Row>
					<OverviewList
						grades={causeGrades}
						type="cause"
						companyId={companyId}
					/>
				</Col>
			</Row>
			<Row mt={'48px'} justifyContent="center">
				<Col md={3}>
					<CompanyGradesCount companyId={companyId} />
				</Col>
			</Row>
		</WaveHeader>
	)
}

export default SoulHeader
