import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const HelpInterface = styled.div`
	position: fixed;
	background-color: white;
	bottom: 0;
	left: 0;
	width: 100%;
	color: #545a66;
	font-size: 16px;
	z-index: 2000;
`

const Cross = styled.button`
	background-color: transparent;
	border: none;
	color: #a9b4cc;
	font-size: 24px;
	cursor: pointer;
	padding-right: 24px;
	line-height: 12px;
`
const Title = styled.div`
	font-weight: bold;
	font-size: 24px;
	text-align: center;
	margin-bottom: 12px;
	color: #7f8799;
`

const Content = styled.div`
	font-size: 16px;
	text-align: left;
	margin-bottom: 42px;
`

const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
		}
	}
`

const CauseHelpInterface = ({ companyId, _closeHelp, cause }) => (
	<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
		{({ loading, error, data }) => {
			if (loading) return <div> Fetching </div>
			if (error) return <div> Error </div>
			const { name } = data.companyOverview
			return (
				<HelpInterface>
					<Row justifyContent="flex-end" mt="6px">
						<Col md={1} textAlign="right">
							<Cross onClick={() => _closeHelp()}>x</Cross>
						</Col>
					</Row>
					<Row justifyContent="center" mt="24px" mb="12px">
						<Col md={8}>
							<Title>La {CAUSE_AND_ACTS[cause].fr}</Title>
							<Content>
								<p>
									Tu es actuellement sur la page de la{' '}
									{CAUSE_AND_ACTS[cause].fr} de {name}. Comme tu peux le voir,
									la {CAUSE_AND_ACTS[cause].fr} est constituée de{' '}
									{CAUSE_AND_ACTS[cause].acts.length} Actes :{' '}
									{CAUSE_AND_ACTS[cause].acts.map(
										(act, i) =>
											`${CAUSE_AND_ACTS[act].fr}${
												i < CAUSE_AND_ACTS[cause].acts.length - 1 ? ', ' : ''
											}`,
									)}
									.
								</p>
								<p>
									Ces actes ont servi d'indication pour noter la Cause, mais ce
									sont d'autres Pandas, comme toi, qui ont attribué une note à
									la Cause en général. Ici, pas de moyenne ou de calculs
									automatiques. A toi de décider si, pour cette marque, un Acte
									doit peser plus, ou moins, dans ta décision finale concernant
									la Cause.
								</p>
							</Content>
						</Col>
					</Row>
				</HelpInterface>
			)
		}}
	</Query>
)

export default CauseHelpInterface
