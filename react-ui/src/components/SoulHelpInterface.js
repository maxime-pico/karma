import React from 'react'
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

const SoulHelpInterface = ({ companyId, _closeHelp }) => (
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
							<Title>L’âme d’une marque</Title>
							<Content>
								<p>Tu es actuellement sur la page de l’Âme de {name}.</p>
								<p>
									Comme tu peux le voir, une marque est évaluée sur 4 Causes
									principales : Environnement, Social, Ethique et
									Fiscalité & Gouvernance.
								</p>
								<p>
									D’autres Pandas, comme toi, ont réunis un ensemble
									d’informations sur cette marque et ont débatu, dans le but
									d’attribuer les différentes karmas. N’hésites pas à explorer
									ces informations en cliquant sur l’une des causes !
								</p>
							</Content>
						</Col>
					</Row>
				</HelpInterface>
			)
		}}
	</Query>
)

export default SoulHelpInterface
