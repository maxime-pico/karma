// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import karmalogo from '../../images/logo.svg'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'


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
`

const ButtonContainer = styled.div`
	text-align: center;
`
const PlainButton = styled.button`
	font-size: 20px;
	color: white;
	font-family: Avenir;
	background-color: #7f8799;
	border-radius: 35px;
	height: 70px;
	width: 280px;
	margin-top: 36px;
	cursor: pointer;

	:hover,
	:focus:hover {
		background-color: #bbbfc9;
	}
	@media (max-width: 425px) {
    	width: 230px;
    	font-size: 18px;
  	}
`

// Display a text and button
const Home = () => {
	return (
		<div>
			<Grid>
				<Row justifyContent={{ md: 'center' }} mt={'96px'}>
					<Col md={4}>
						<ImageContainer>
							<img src={karmalogo} height="140" alt="karma panda" />
						</ImageContainer>
					</Col>
				</Row>
				<Row justifyContent={{ md: 'center' }}>
					<Col xs={12} md={8} textAlign="left">
						<TextZone>
							<TextZoneTitle> Bienvenue sur Karma Panda !</TextZoneTitle>
							<p>
								Ici, une communauté de Pandas s’est éveillée pour faire
								appliquer la loi du Karma aux marques qui nous entourent.
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
							<p>Pandas, Pandas : Ensemble, appliquons la loi du Karma !</p>
							<ButtonContainer>
								<Link to="/brands">
									<PlainButton> Découvrir la plateforme </PlainButton>
								</Link>
							</ButtonContainer>
						</TextZone>
					</Col>
				</Row>
			</Grid>
		</div>
	)
}

export default Home
