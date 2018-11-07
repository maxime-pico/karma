import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const OpinionPreviewBoxInside = styled.div`
	margin: 20px 10px;
	max-height: 500px;
	overflow-y: auto;
	overflow-x: hidden;
	::-webkit-scrollbar {
		border: none;
		width: 7px;
	}
	::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background-color: #e8e9e8;
	}
`
const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`
const RoundWindow = styled.div`
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: white;
	margin: auto;

	img {
		width: ${props => props.size}px;
	}
`
const UserName = styled.div`
	font-size: 0.8em;
	font-weight: 600;
	padding-top: 5px;
`
const OpinionTitle = styled.div`
	font-size: 1.5em;
	font-weight: 600;
`
const Tick = styled.div`
	color: white;
	background: linear-gradient(
		to right,
		#85d8e6,
		#b3d7f2 22.14%,
		#baacd4 41.51%,
		#af8cc0 56.2%,
		#d02417 98.46%,
		#d02417
	);
	height: 25px;
	width: 25px;
	line-height: 1.3em;
	padding-left: 6px;
	padding-top: 2px;
	margin-right: 5px;
	margin-bottom: 2px;
	border-radius: 50%;
	font-weight: 600;
	font-size: 1.3em;
	display: inline-block;
`
const AffiliationsCount = styled.span`
	font-size: 1.5em;
	font-weight: 600;
`

const Tags = styled.div`
	font-size: 1.2em;
	font-weight: 600;
`
const OpinionText = styled.span`
	color: #5d5c5c;
`

const BorderBottom = styled.div`
	border-bottom: 1pt solid #d5d5d5;
	position: absolute;
	bottom: 0;
	left: 40%;
	right: 5%;
`
const ReadMore = styled.div`
	font-size: 1.2em;
	font-weight: 600;
	padding-bottom 5px;
`
const NoOpinions = styled.div`
	font-size: 1.1em;
	margin: 10px 0px;
`

const relative = {
	position: 'relative',
}

const OpinionPreview = ({ opinionsFeed, location, act }) => (
	<OpinionPreviewBoxInside>
		{opinionsFeed.map((opinion, index) => (
			<Row key={opinion.id} justifyContent="left" p={4} style={relative}>
				<Col md={1} textAlign="center">
					<RoundWindow size={60}>
						<Push />
						<img
							src={
								process.env.PUBLIC_URL + `/images/${opinion.writtenBy.picture}`
							}
							alt={opinion.writtenBy.name}
						/>
					</RoundWindow>
					<UserName>@{opinion.writtenBy.name}</UserName>
				</Col>
				<Col textAlign="left" pl={2}>
					<Row>
						<Col md={8}>
							<OpinionTitle>Titre : {opinion.title}</OpinionTitle>
						</Col>
						<Col>
							<Tick>✔</Tick>
							<AffiliationsCount>{opinion.affiliationsCount}</AffiliationsCount>
						</Col>
					</Row>
					<Tags mb={2}>
						{opinion.tags.map(tag => (
							<span className="px-1" key={opinion.id + tag}>
								#{tag}
							</span>
						))}
					</Tags>
					<Row p={1}>
						<OpinionText>{opinion.text}</OpinionText>
					</Row>
				</Col>
				{index < opinionsFeed.length - 1 && <BorderBottom />}
			</Row>
		))}
		{opinionsFeed.length ? (
			<Link to={`${location.pathname}act/${act}`}>
				<ReadMore>Voir toutes les opinions et leurs sources</ReadMore>
			</Link>
		) : (
			<NoOpinions>Il n'y a pas encore d'opinion pour cet acte</NoOpinions>
		)}
	</OpinionPreviewBoxInside>
)

export default OpinionPreview
