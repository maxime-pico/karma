import React from 'react'
import { convertGradesIntoColors } from '../utils'
import { CAUSE_AND_ACTS } from '../constants'
/* import KarmaBubbleAndSlider from './KarmaBubbleAndSlider'*/
import BreadCrumb from './BreadCrumb'
import CompanyOverview from './CompanyOverview'
import OverviewList from './OverviewList'
import CauseGradesCount from './CauseGradesCount'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
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
const ACT_GRADES_QUERIES = {
	ENVIRONMENT: gql`
		query EnvironmentGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				CLIMAT_CHANGE
				ECOSYSTEM_PRESERVATION
				RESOURCE_PRESERVATION
				ANIMAL_CONDITION
			}
		}
	`,
	ETHICS: gql`
		query EthicsGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				POLITICAL_RESPONSIBILITY
				MARKET_INFLUENCE
				POPULATION_RESPECT
				CONSUMER_RESPECT
				QUESTIONABLE_INDUSTRIES
			}
		}
	`,
	FISCAL: gql`
		query FiscalGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				SHAREHOLDER_REMUNERATION
				TAXATION_LEVEL
				EXECUTIVE_COMPENSATION
				EMPLOYEE_EQUITY
			}
		}
	`,
	SOCIAL: gql`
		query SocialGradesQuery($companyId: ID!) {
			companyActGrades(companyId: $companyId) {
				EMPLOYMENT_CONDITIONS
				EMPLOYEE_DISCRIMINATIONS
				WORKING_CONDITIONS
				MANAGING_CONDITIONS
			}
		}
	`,
}

class CauseHeader extends React.Component {
	render() {
		const { companyId, karma, type, cause } = this.props
		const karmaColor = convertGradesIntoColors(karma)
		return (
			<WaveHeader fluid color={karmaColor}>
				<BreadCrumb companyId={companyId} cause={cause} />
				<Row justifyContent="center">
					<Col md={2}>
						<CompanyOverview companyId={companyId} />
					</Col>
					<Col md={7}>
						{/*<KarmaBubbleAndSlider karma={overallKarma} type="global" />*/}
						<Row mb={'12px'}>
							<Col md={9}>
								<KarmaDescription align={'left'}>
									{CAUSE_AND_ACTS[cause].fr}
								</KarmaDescription>
							</Col>
							<Col md={3}>
								<KarmaDescription align={'right'}>
									{karma === null ? 'N/A' : karma}
								</KarmaDescription>
							</Col>
						</Row>
						<Query query={ACT_GRADES_QUERIES[cause]} variables={{ companyId }}>
							{({ loading, error, data }) => {
								if (loading) return <div> Fetching </div>
								if (error) return <div> Error </div>

								const companyActGrades = data.companyActGrades
								return (
									<OverviewList
										grades={companyActGrades}
										cause={cause}
										companyId={companyId}
									/>
								)
							}}
						</Query>
					</Col>
				</Row>
				<Row mt={'48px'} justifyContent="center">
					<Col md={5}>
						<CauseGradesCount companyId={companyId} identifier={cause} />
					</Col>
				</Row>
			</WaveHeader>
		)
	}
}

export default CauseHeader
