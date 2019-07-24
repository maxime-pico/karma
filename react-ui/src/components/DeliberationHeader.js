import React from 'react'
import { convertGradesIntoColors } from '../utils'
import { CAUSE_AND_ACTS } from '../constants'
/* import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'*/
import BreadCrumb from './BreadCrumb'
import CompanyOverview from './CompanyOverview'
import ActDescription from './ActDescription'
import OpinionsAndGradesCount from './OpinionsAndGradesCount'
import { Grid, Row, Col, styled } from '@smooth-ui/core-sc'

const KarmaDescription = styled.div`
	font-size: 36px;
	font-weight: 600;
	text-align: ${props => props.align};
	color: white;
`

const WaveHeader = styled(Grid)`
	padding-top: 12px;
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

class DeliberationHeader extends React.Component {
	render() {
		const { companyId, karma, opinionsFeed, cause, act, grading } = this.props
		const karmaColor = convertGradesIntoColors(karma)
		return (
			<WaveHeader fluid color={karmaColor}>
				<BreadCrumb
					companyId={companyId}
					cause={cause}
					act={act}
					grading={grading}
				/>
				<Row justifyContent="center">
					<Col md={2}>
						<CompanyOverview companyId={companyId} />
					</Col>
					<Col md={7}>
						{/*<KarmaBubbleAndSlider karma={overallKarma} type="global" />*/}
						<Row mb={'12px'}>
							<Col md={9}>
								<KarmaDescription align={'left'}>
									{CAUSE_AND_ACTS[act].fr}
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
						<ActDescription act={act} color="white" justifyContent="left" />
					</Col>
				</Row>
				<Row justifyContent="center">
					<Col md={5}>
						<OpinionsAndGradesCount opinionsFeed={opinionsFeed} color="white" />
					</Col>
				</Row>
			</WaveHeader>
		)
	}
}

export default DeliberationHeader
