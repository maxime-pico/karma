import React from 'react'
import { Row, Col } from '@smooth-ui/core-sc'
import styled from 'styled-components'

const Explainer = styled.span`
	font-size: 1.2em;
	color: #ababab;
`

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
const SoulExplanation = () => (
	<Row justifyContent={{ md: 'center' }} py={5}>
		<Col md={8}>
			<Explainer>
				Voici l’Âme de la marque. Comme tu peux le constater : nous n’avons pas
				suffisamment d’Opinions pour que tu puisses juger des Actes de cette
				entreprise et lui attribuer du Karma. Cliques sur un des Actes qui
				n’affiche aucune Opinion et sois un des premiers Pandas à ouvrir les
				Délibérations. Tous les Pandas savent qu’
				<b>un jugement non éclairé n’a pas de valeur !</b>
			</Explainer>
		</Col>
	</Row>
)

export default SoulExplanation
