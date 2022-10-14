/*
Component called by Soul and rendered when Soul's state help = true
in charge of displaying the help text and the button to manually activate the
tutorial
*/
// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { IconContext } from 'react-icons'
import { FaPlay, FaStop } from 'react-icons/fa'
import { Row, Col, styled } from '@smooth-ui/core-sc'

// <STYLE>
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
`

const Content = styled.div`
	font-size: 16px;
	text-align: left;
	margin-bottom: 42px;
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
// </STYLE>

// Prepare the query that will fetch the name of the company to display in the text
const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
		}
	}
`

// Declare types of expected props
type Props = {
	companyId: string,
	_closeHelp: () => any,
	_launchTutorial: () => any,
	_endTutorial: () => any,
	stepsEnabled: () => any,
}

// SoulHelpInterface fetched the name of the company based on the id and inserts
// it inside the text of the window
const SoulHelpInterface = (props: Props) => {
	const {
		companyId,
		_closeHelp,
		_launchTutorial,
		_endTutorial,
		stepsEnabled,
	} = props
	return (
		<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
			{({ loading, error, data }) => {
				if (loading) return <div> Loading... </div>
				if (error) return <div> Error </div>

				// getting the company name from the query result
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
								{!stepsEnabled ? (
									<div>
										<Title>L’âme d’une marque</Title>
										<Content>
											<p>Tu es actuellement sur la page de l’Âme de {name}.</p>
											<p>
												Comme tu peux le voir, une marque est évaluée sur 4
												Causes principales : Environnement, Social, Ethique et
												Fiscalité & Gouvernance.
											</p>
											<p>
												D’autres Pandas, comme toi, ont réunis un ensemble
												d’informations sur cette marque et ont débatu, dans le
												but d’attribuer les différentes karmas. N’hésites pas à
												explorer ces informations en cliquant sur l’une des
												causes !
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
}

export default SoulHelpInterface
