import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CAUSE_AND_ACTS } from '../../../services/constants'
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

const ActHelpInterface = ({ companyId, _closeHelp, act }) => (
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
							<Title>L'Acte {CAUSE_AND_ACTS[act].fr}</Title>
							<Content>
								<p>
									Tu es actuellement sur la page de l'acte{' '}
									{CAUSE_AND_ACTS[act].fr} de {name}. Un acte, c'est le plus bas
									niveau de notation pour une marque. Le sujet le plus précis.
								</p>
								<p>
									Sur la page tu vas pouvoir voir le travail de recherche que
									les autres Pandas, comme toi, on fait concernant {name} en
									particulier. Ces travaux de recherche sont constitués d'un
									texte et, surtout, de sources. Des liens vers d'autres sites
									que tu peux explorer.
								</p>
								<p>
									C'est sur la base de ces précieux travaux de recherche que les
									Pandas ont pu attribuer une note globale à l'acte.
								</p>
							</Content>
						</Col>
					</Row>
				</HelpInterface>
			)
		}}
	</Query>
)

export default ActHelpInterface
