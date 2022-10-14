import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CAUSE_AND_ACTS } from '../../../services/constants'
import { IconContext } from 'react-icons'
import { FaPlay, FaStop } from 'react-icons/fa'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const HelpInterface = styled.div`
	position: fixed;
	background-color: ${props => props.backgroundColor};
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
`

const Content = styled.div`
	font-size: 16px;
	text-align: left;
	margin-bottom: 24px;
`
const TutorialTrigger = styled.button`
	background-color: transparent;
	border: none;
	margin-bottom: 42px;
	color: #a9b4cc;
	font-weight: bold;
`

const TutorialStop = styled.button`
	background-color: white;
	border: none;
	margin-bottom: 42px;
	color: #a9b4cc;
	font-weight: bold;
	border-radius: 25px;
	padding: 12px 24px;
`

const iconStyle = {
	color: '#A9B4CC',
	className: 'global-class-name',
	style: { marginLeft: '6px', marginBottom: '2px' },
}

const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
		}
	}
`

const ActHelpInterface = ({
	companyId,
	_closeHelp,
	act,
	_launchTutorial,
	_endTutorial,
	stepsEnabled,
}) => (
	<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
		{({ loading, error, data }) => {
			if (loading) return <div> Fetching </div>
			if (error) return <div> Error </div>
			const { name } = data.companyOverview
			return (
				<HelpInterface backgroundColor={stepsEnabled ? '#545A66' : 'white'}>
					<Row justifyContent="flex-end" mt="6px">
						<Col md={1} textAlign="right">
							<Cross onClick={() => _closeHelp()}>x</Cross>
						</Col>
					</Row>
					<Row justifyContent="center" mt="24px">
						<Col md={8}>
							{!stepsEnabled ? (
								<div>
									<Title>L'Acte {CAUSE_AND_ACTS[act].fr}</Title>
									<Content>
										<p>
											Tu es actuellement sur la page de l'acte{' '}
											{CAUSE_AND_ACTS[act].fr} de {name}. Un acte, c'est le plus
											bas niveau de notation pour une marque. Le sujet le plus
											précis.
										</p>
										<p>
											Sur la page tu vas pouvoir voir le travail de recherche
											que les autres Pandas, comme toi, on fait concernant{' '}
											{name} en particulier. Ces travaux de recherche sont
											constitués d'un texte et, surtout, de sources. Des liens
											vers d'autres sites que tu peux explorer.
										</p>
										<p>
											C'est sur la base de ces précieux travaux de recherche que
											les Pandas ont pu attribuer une note globale à l'acte.
										</p>
									</Content>
									<TutorialTrigger onClick={() => _launchTutorial()}>
										Tutoriel Interactif{' '}
										<IconContext.Provider value={iconStyle}>
											<FaPlay />
										</IconContext.Provider>
									</TutorialTrigger>
								</div>
							) : (
								<TutorialStop onClick={() => _endTutorial()}>
									Tutoriel Interactif{' '}
									<IconContext.Provider value={iconStyle}>
										<FaStop />
									</IconContext.Provider>
								</TutorialStop>
							)}
						</Col>
					</Row>
				</HelpInterface>
			)
		}}
	</Query>
)

export default ActHelpInterface
