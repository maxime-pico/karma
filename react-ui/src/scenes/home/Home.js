// @flow
import React from 'react'
import karmalogo from '../../images/logo.svg'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'
import CTAButton from '../../components/buttons/CTAButton'

const HomeWrapper = styled.div`
	background-image: url(${process.env.PUBLIC_URL}/images/soul.png);
	background-repeat: no-repeat;
	background-size: 100%;
`

const Logo = styled.img`
	height: 16rem;
	margin-bottom: 3rem;
`


const ImageContainer = styled.div `
  @media (max-width: 425px) {
    display: none;
  }
`
const TextZone = styled.div`
	background-color: white;
	padding: 80px;
	margin: 100px 0 80px 0;
	border-radius: 112px;
	color: #7f8799;
	font-size: 22px;
	font-family: Avenir;
	
	@media (max-width: 425px) {
    	margin: 0 0 10px 0;
    	border-radius: 0px;
    	padding: 30px;
    	font-size: 18px;
  	}
`
const TextZoneTitle = styled.div`
	color: #545a66;
	font-size: 40px;
	font-family: Avenir;
	font-weight: 900;
	margin-bottom: 24px;
	@media (max-width: 425px) {
    	font-size: 25px;
  	}
	padding: 8rem 9rem;
	margin: 10rem 0 11rem 0;
	border-radius: 11.2rem;
`

const CauseRow = styled.div`
	background-color: white;
	padding: 3rem 5rem;
	margin: 3.5rem 0 0 0;
	border-radius: 7.2rem;
	display: flex;
	align-items: center;
	min-height: 21rem;

	> div {
		flex-basis: 50%;
		min-width: 50%;
		max-width: 50%;
	}
`

const CauseTitle = styled.div`
	display: flex;
	align-items: center;
`

const RoundWindow = styled.div`
	text-align: center;
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: ${props => props.color};
	margin-right: 2rem;
	position: relative;
	img {
		height: 60%;
	}
`

const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`

const CTABlock = styled.div`
	background-color: #545a66;
	border-radius: 3rem;
	margin: 6.5rem 0 11.5rem;
	padding: 3.5rem 4rem;
	display: flex;
	align-items: center;
	justify-content: center;

	h3 {
		margin-bottom: 0;
		color: white;
	}

	button {
		margin-top: 0;
		margin-left: 2.5rem;
	}
`

const CTABand = styled.div`
	background-color: #545a66;
	padding: 12rem 4rem;

	h2 {
		color: white;
	}

	h3 {
		color: white;
		font-family: 'Avenir-Roman', sans-serif;
	}
`

const ExplanationWrapper = styled.section`
	background-color: white;
	padding: 11rem 0;
`

const ExplanationIntro = styled.div`
	background-color: white;
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10rem;

	h3 {
		font-family: 'Avenir-Roman', sans-serif;
	}

	h2 {
		margin-bottom: 2.5rem;
	}

	p {
		margin-bottom: 1rem;
	}
`

const ExplanationScale = styled.div`
	background-color: #f7f7f7;
	border-radius: 7.2rem;
	text-align: center;
	padding: 4rem 4.5rem;
	flex-basis: 50rem;
	min-width: 50rem;
	max-width: 50rem;
	margin-left: 6rem;

	img {
		margin: 2rem 0;
	}

	h3 {
		font-family: 'Avenir-Black', sans-serif;
	}
`

const ExplanationDiagram = styled.div`
	h3 {
		margin-bottom: 1rem;
	}
	img {
		margin: 3.5rem 0 4rem 0;
	}
	@media (max-width: 425px) {
    	width: 230px;
    	font-size: 18px;
  	}
`

// Display a text and button
const Home = () => {
	return (
		<HomeWrapper>
			<Grid>
<<<<<<< HEAD
				<Row justifyContent={{ md: 'center' }} mt={'96px'}>
					<Col md={4}>
						<ImageContainer>
							<img src={karmalogo} height="140" alt="karma panda" />
						</ImageContainer>
=======
				<Row justifyContent={{ md: 'center' }} pt={'9.6rem'}>
					<Col md={5}>
						<Logo src={karmalogo} alt="karma panda" />
						<h1 class="title-size2">
							Faites appliquer la loi du Karma
							<br /> aux marques qui nous entourent
						</h1>
						<CTAButton link="/brands">
							<img
								src={process.env.PUBLIC_URL + '/icons/gradekarmabutton.svg'}
								alt="grading hammer"
								width="24"
								height="22"
							/>
							Jugez l'âme des marques
						</CTAButton>
>>>>>>> develop
					</Col>
				</Row>
				<Row justifyContent={{ md: 'center' }}>
					<Col xs={12} md={8} textAlign="left">
						<TextZone>
							<p>
								<strong>
									Ici, une communauté de Pandas s’est éveillée pour faire
									appliquer la loi du Karma aux marques qui nous entourent.
								</strong>
							</p>
							<p>
								Ensemble, nous pouvons juger de l’Âme des entreprises en
								fonction de leur impact réel sur le monde et créer un vrai
								contrepouvoir citoyen à l’influence des marques.
							</p>
							<p>
								Plus nous serons de Pandas, plus nous pourrons favoriser les
								entreprises bénéfiques pour nos sociétés et notre environnement.
								Les autres seront forcées de changer radicalement, ou
								disparaitre.
							</p>
							<p>
								<big>
									Pandas, Pandas : Ensemble, appliquons
									<br /> la loi du Karma !
								</big>
							</p>
						</TextZone>
					</Col>
				</Row>
				<Row justifyContent={{ md: 'center' }}>
					<h3 class="title-size2">
						Jugez le Karma des marques qui nous entourent
					</h3>
					<h2 class="title-size1">Basé sur 4 grandes causes</h2>
					<Col md={12} textAlign="left">
						<CauseRow>
							<CauseTitle>
								<RoundWindow size={108} color="#D7D0C8">
									<Push />
									<img
										src={
											process.env.PUBLIC_URL + `/icons/cause/ENVIRONMENT.png`
										}
										alt="Environnementale"
									/>
								</RoundWindow>
								<div>
									<h2 class="title-size3">Environnementale</h2>
									<h4 class="title-size5">Décomposée en 4 Actes</h4>
								</div>
							</CauseTitle>
							<ul>
								<li>Implication dans le changement climatique</li>
								<li>Préservation des écosystèmes</li>
								<li>Préservation des ressources naturelles</li>
								<li>Condition animale</li>
							</ul>
						</CauseRow>

						<CauseRow>
							<CauseTitle>
								<RoundWindow size={108} color="#D7D0C8">
									<Push />
									<img
										src={process.env.PUBLIC_URL + `/icons/cause/SOCIAL.png`}
										alt="Sociale"
									/>
								</RoundWindow>
								<div>
									<h2 class="title-size3">Sociale</h2>
									<h4 class="title-size5">Décomposée en 4 Actes</h4>
								</div>
							</CauseTitle>
							<ul>
								<li>Conditions salariales</li>
								<li>Discriminations</li>
								<li>Conditions de travail</li>
								<li>Management et Epanouïssement salarial</li>
							</ul>
						</CauseRow>

						<CauseRow>
							<CauseTitle>
								<RoundWindow size={108} color="#D7D0C8">
									<Push />
									<img
										src={process.env.PUBLIC_URL + `/icons/cause/ETHICS.png`}
										alt="Éthique"
									/>
								</RoundWindow>
								<div>
									<h2 class="title-size3">Éthique</h2>
									<h4 class="title-size5">Décomposée en 5 Actes</h4>
								</div>
							</CauseTitle>
							<ul>
								<li>Responsabilité politique</li>
								<li>Influence du marché</li>
								<li>Respect des populations</li>
								<li>Respect du consommateur</li>
								<li>Industries critiquables et/ou technologies critiquables</li>
							</ul>
						</CauseRow>

						<CauseRow>
							<CauseTitle>
								<RoundWindow size={108} color="#D7D0C8">
									<Push />
									<img
										src={process.env.PUBLIC_URL + `/icons/cause/FISCAL.png`}
										alt="Fiscalité & Gouvernance"
									/>
								</RoundWindow>
								<div>
									<h2 class="title-size3">Fiscalité & Gouvernance</h2>
									<h4 class="title-size5">Décomposée en 4 Actes</h4>
								</div>
							</CauseTitle>
							<ul>
								<li>Taux de rémunération de l'actionnariat</li>
								<li>Taux d'imposition</li>
								<li>Surémunération des dirigeants</li>
								<li>Participation des salariés</li>
							</ul>
						</CauseRow>
					</Col>
				</Row>
				<Row justifyContent={{ md: 'center' }}>
					<Col md={7} textAlign="right">
						<CTABlock>
							<h3 class="title-size4">
								Envie d’appliquer
								<br /> la loi du karma ?
							</h3>
							<CTAButton link="/brands">
								<img
									src={process.env.PUBLIC_URL + '/icons/gradekarmabutton.svg'}
									alt="grading hammer"
									width="24"
									height="22"
								/>
								Jugez l'âme des marques
							</CTAButton>
						</CTABlock>
					</Col>
				</Row>
			</Grid>
			<ExplanationWrapper>
				<Grid>
					<ExplanationIntro>
						<div>
							<h3 class="title-size4">Le système de notation du Karma</h3>
							<h2 class="title-size1">Le Karma en bref</h2>
							<p>
								<strong>
									Le Karma est le reflet de ce que les Pandas pensent
									collectivement des actions concrètes d'une entreprise
								</strong>
							</p>
							<p>
								Nous avons mis en place un système de notation « démocratique »
								: les marques sont jugées par les Pandas, pour les Pandas, sur
								la base de sources collectées et validées par la communauté.
							</p>
						</div>
						<ExplanationScale>
							<h3 class="title-size4">Echelle de notation</h3>
							<img
								src={process.env.PUBLIC_URL + `/images/karma-scale.svg`}
								alt="Echelle de notation"
							/>
							<p>
								Nous avons décidé de choisir <br />
								une notation discrète à 5 niveaux :
							</p>
							<p>
								<strong>-2</strong> étant la moins bonne note,
								<br />
								<strong>+2</strong> la meilleure.
							</p>
						</ExplanationScale>
					</ExplanationIntro>

					<ExplanationDiagram>
						<h3 class="title-size3">Les différents niveaux de notation</h3>
						<p>
							Il existe plusieurs niveaux de notation qui ne sont
							<br /> pas tous liés algorithmiquement entre eux.
						</p>

						<img
							src={process.env.PUBLIC_URL + `/images/karma-diagram.svg`}
							alt="Les différents niveaux de notation"
						/>
					</ExplanationDiagram>

					<CTAButton ghost link="/brands">
						+ d'explications sur les notes
					</CTAButton>
				</Grid>
			</ExplanationWrapper>
			<CTABand>
				<h3 class="title-size5">Envie d’appliquer la loi du Karma ?</h3>
				<h2 class="title-size1">Devenez un panda !</h2>
				<CTAButton link="/brands">
					<img
						src={process.env.PUBLIC_URL + '/icons/gradekarmabutton.svg'}
						alt="grading hammer"
						width="24"
						height="22"
					/>
					Jugez l'âme des marques
				</CTAButton>
			</CTABand>
		</HomeWrapper>
	)
}

export default Home
