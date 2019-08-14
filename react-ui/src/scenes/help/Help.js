// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

/* This page is available at /help Very simple page, just a lot of text there */

// Specific styles for the page
const BackGround = styled(Grid)`
	width: 70%;
	max-width: 885px;
	background-color: white;
	border-radius: 90px;
`

const Title = styled.div`
	color: #545a66;
	font-size: 40px;
	font-weight: 900;
	margin-bottom: 24px;
`

const Header1 = styled.div`
	color: #545a66;
	font-size: 30px;
	font-weight: 900;
	margin-bottom: 12px;
	margin-top: 42px;
`
const Header2 = styled.div`
	color: #545a66;
	font-size: 24px;
	margin-top: 24px;
	margin-bottom: 6px;
`
const Video = styled.div`
	margin-top: 24px;
	margin-bottom: 96px;
`

// The Help component Displays the text of the page, no other components called here
const Help = () => {
	return (
		<div>
			<BackGround my="96px" p="60px">
				<Row justifyContent="center">
					<Col md={12} textAlign="left" fontSize="18px" color="#7F8799">
						<Title>Aide</Title>
						<p>
							Tu es un peu perdu en te balladant sur la plateforme ? Pas de
							problème ! Tu devrais trouver ici la réponse à toutes tes
							questions.
						</p>
						<p>
							Note : Si tu cherches des infos sur le projet en général, c'est
							sur la page{' '}
							<Link to="/about">
								<b>à propos</b>
							</Link>{' '}
							que ça se passe
						</p>
						<Header1>Vidéo tutoriel</Header1>
						<p>
							Dans cette vidéo tu vas pouvoir découvrir les différentes pages
							d’une marque, ainsi que le processus pour noter. Après avoir vu ça
							tu devrais y voir plus clair :
						</p>
						<Video>
							<div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
								<iframe
									title="Tutorial video"
									src="https://player.vimeo.com/video/347089786"
									style={{
										position: 'absolute',
										top: '0',
										left: '0',
										width: '100%',
										height: '100%',
									}}
									frameborder="0"
									allow="autoplay; fullscreen"
									allowfullscreen
								/>
							</div>
							<script src="https://player.vimeo.com/api/player.js" />
						</Video>
						<Header1>Explications du système de notation</Header1>
						<p>
							Nous avons créé le système de notation afin qu'il soit le reflet
							de ce que les Pandas (ie. citoyens utilisateurs du service)
							pensent collectivement des actions concrètes d'une entreprise. Et
							nous laissons chaque Panda juger selon ses propres valeurs,
							quelles qu'elles soient.
						</p>
						<p>
							Afin d'arriver à remplir ces deux critères, nous avons mis en
							place un système de notation « démocratique » : les marques sont
							jugées par les Pandas, pour les Pandas, sur la base de sources
							collectées et validées par la communauté.
						</p>
						<Header2>Différents niveaux de notation</Header2>
						<p>
							Nous avons créé un processus pyramidal à quatre niveaux :
							<ul>
								<li>
									<b>Le niveau le plus haut c'est le Karma d'une Marque</b>, on
									souhaite pouvoir déterminer si une Marque est bonne ou
									mauvaise d'un simple coup d’oeil;
								</li>
								<li>
									<b>Puis vient le Karma par Cause</b>, au nombre de 4, les
									Causes représentent les grandes thématiques sur lesquelles une
									marque peut être jugée;
								</li>
								<li>
									<b>Pour chaque Cause, il existe un ensemble d'Actes</b>. Un
									Acte vise à refléter le comportement d'une marque concernant
									une des problématiques de la Cause;
								</li>
								<li>
									<b>
										Enfin pour aider à juger du Karma d'un Acte on organisera
										des Délibérations
									</b>
									où chaque Panda pourra avancer son Opinion ou rallier son
									jugement à une Opinion existante;
								</li>
							</ul>
						</p>
						<Header2>Lien entre deux niveaux de notation</Header2>
						<p>
							<ul>
								<li>
									<b>Délibération → Acte :</b> Bien que lorsqu'un Panda attribue
									du Karma à un Acte, il affilie sa note à une opinion, il n'y a
									pas de lien "algorithmique" entre l'ensemble des délibérations
									et un Acte. Deux Pandas peuvent d'ailleurs s'affilier à une
									même opinion et attribuer un Karma différent à l'Acte
								</li>
								<li>
									<b>Acte → Cause : </b> Là non-plus il n'y a pas de lien
									algorithmique. C'est à dire qu'une Cause est notée par un
									Panda en conscience des Karma des Actes, mais aucun lien
									formel n'est établis. Deux Pandas peuvent donc ici aussi
									attribuer des Karmas différents à une même Cause en fonction
									de leur interprétation globale des Actes
								</li>
								<li>
									<b>Cause → Karma : </b> Ici il s'agit d'un lien algorithmique.
									Le Karma d'une marque est, par défaut, la moyenne arithmétique
									des Karmas des Causes. Si un Panda le souhaite, il pourra
									personnaliser cette moyenne en attribuant des pondérations aux
									différentes Causes. La pondération nulle ne sera pas autorisée
								</li>
							</ul>
						</p>
						<Header2>Echelle de notation</Header2>
						<p>
							Pour toutes les notes attribuées par les Pandas, nous avons décidé
							de choisir une échelle de notation discrète à 5 niveaux : -2, -1,
							0, 1 et 2. -2 étant la moins bonne note et +2 la meilleure.
						</p>
						<p>
							En particulier :
							<ul>
								<li>
									Le Karma d'un Acte est noté sur l'échelle suivante :
									<ul>
										<li>Très Maléfique (-2)</li>
										<li>Plutôt Maléfique (-1)</li>
										<li>Mouais... (0)</li>
										<li>Plutôt Bénéfique (+1)</li>
										<li>Très Bénéfique (+2)</li>
									</ul>
								</li>
								<li>
									Le Karma d'une Cause est noté sur l'échelle suivante :
									<ul>
										<li>Très Mauvais Karma (-2)</li>
										<li>Plutôt Mauvais Karma (-1)</li>
										<li>Karma Neutre (0)</li>
										<li>Plutôt Bon Karma(+1)</li>
										<li>Très bon Karma (+2)</li>
									</ul>
								</li>
							</ul>
						</p>
						<Header2> Agrégation des notations</Header2>
						<p>
							Les notes attribuées par les Pandas doivent être agrégées pour
							plus de lisibilité dans l'interface. Voici le type d'agrégation
							que nous avons choisi pour les différents niveaux :
							<ul>
								<li>
									<b>Karma par Acte :</b> la moyenne des Karmas attribués par
									les Pandas est utilisée pour représenter le Karma par Acte.
									Cependant on accompagnera toujours cette moyenne d'un
									diagramme en barre représentant la répartition des notes entre
									les 5 niveaux (pas encore développé)
								</li>
								<li>
									<b>Karma par Cause :</b> la moyenne des Karmas attribués par
									les Pandas est utilisée pour représenter le Karma par Cause.
									Cependant on accompagnera, lorsque c'est possible, cette
									moyenne d'un diagramme en barre représentant la répartition
									des notes entre les 5 niveaux (pas encore développé)
								</li>
							</ul>
						</p>
						<Header2> Méthode de Notation</Header2>
						<p>
							Lorsqu'un Panda souhaite contribuer à la notation d'une marque il
							a plusieurs possibilités
							<ul>
								<li>
									Attribuer du Karma aux Causes d'une marque — pour ce faire il
									devra :
									<ul>
										<li>
											Noter toutes les Causes à la fois. Il est impossible de
											noter une Cause indépendamment des autres
										</li>
										<li>
											S'informer sur la marque grâce aux indices à disposition.
											A minima en prenant connaissance des différents Karmas par
											Acte pour une cause donnée
										</li>
									</ul>
								</li>
								<li>
									Juger d'un Acte d'une marque — pour ce faire il devra :
									<ul>
										<li>
											Consulter l'espace de Délibération de l'Acte en question
											et lire les différentes opinions afin de formuler son
											jugement
										</li>
										<li>
											S'affilier à l'opinion qui l'a le plus aidé à formuler son
											jugement. Si aucune opinion ne l'a convaincu alors
										</li>
										<li>
											Rédiger une Opinion qui est le reflet de son point de vue,
											nécessairement appuyé de sources
										</li>
									</ul>
									Afin de donner aux marques une chance d'améliorer leur Karma,
									nous veillerons à ne considérer que les 5 dernières années de
									vie de la marque.
								</li>
							</ul>
						</p>
					</Col>
				</Row>
			</BackGround>
		</div>
	)
}

export default Help
