import React from 'react'
import { convertGradesIntoWords, convertGradesIntoColors } from '../utils'
/* import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'*/
import CompanyOverview from './CompanyOverview'
import OverviewList from './OverviewList'
import CompanyGradesCount from './CompanyGradesCount'
import { Grid, Row, Col, styled } from '@smooth-ui/core-sc'

const KarmaDescription = styled.div`
	font-size: 36px;
	font-weight: 600;
	text-align: ${props => props.align};
	color: white;
`

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

class SoulHeader extends React.Component {
	render() {
		const { companyId, karma, type, causeGrades } = this.props
		const karmaDescription = convertGradesIntoWords(karma, type).fr
		const karmaColor = convertGradesIntoColors(karma)
		return (
			<WaveHeader fluid color={karmaColor}>
				<Row justifyContent="center">
					<Col md={2}>
						<CompanyOverview companyId={companyId} />
					</Col>
					<Col md={7}>
						{/*<KarmaBubbleAndSlider karma={overallKarma} type="global" />*/}
						<Row mb={'12px'}>
							<Col md={9}>
								<KarmaDescription align={'left'}>
									{karmaDescription}
								</KarmaDescription>
							</Col>
							<Col md={3}>
								<KarmaDescription align={'right'}>
									<span className="karma">
										{karma === null ? 'N/A' : karma}
									</span>
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
}

export default SoulHeader
