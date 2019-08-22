import React from 'react'
//import { Link } from 'react-router-dom'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const OpinionContainer = styled(Row)`
	justify-content: left;
	@media (max-width: 540px) {
		justify-content: center;
	}
`

const OpinionCard = styled(Col)`
	background-color: #f2f2f2;
	border-radius: 26px;
	min-height: 306px;
	padding: 30px;
	font-size: 0.8em;
	color: #2b2e34;
	:hover + .OpinionCardBack {
		display: block;
	}
	@media (max-width: 960px) {
		font-size: 1em;
		hmin-eight: 390px;
		margin-bottom: 24px;
	}
`

// const OpinionCardBack = styled.div`
// 	display: none;
// 	background-color: #f2f2f2;
// 	border-radius: 26px;
// 	height: 306px;
// 	width: 33%;
// 	padding: 30px;
// 	font-size: 14px;
// 	color: #2b2e34;
// 	position: relative;
// 	top: -306px;
// 	z-index: 3;
// `

const UserName = styled.div`
	text-align: right;
	margin-top: 10px;
`

// const Push = styled.span`
// 	display: inline-block;
// 	height: 100%;
// 	vertical-align: middle;
// `
// const RoundWindow = styled.div`
// 	height: ${props => props.size}px;
// 	width: ${props => props.size}px;
// 	border-radius: ${props => props.size}px;
// 	overflow: hidden;
// 	background-color: white;

// 	img {
// 		width: ${props => props.size}px;
// 	}
// `

// const Tick = styled.div`
// 	color: grey;
// 	height: 25px;
// 	width: 25px;
// 	line-height: 1.3em;
// 	padding-left: 6px;
// 	padding-top: 2px;
// 	margin-right: 5px;
// 	margin-bottom: 2px;
// 	border-radius: 50%;
// 	font-weight: 600;
// 	font-size: 1.3em;
// 	display: inline-block;
// `

// const AffiliationsCount = styled.span`
// 	font-size: 1.5em;
// 	font-weight: 600;
// `

// const Tags = styled.div`
// 	font-size: 1.2em;
// 	font-weight: 600;
// `

const OpinionPreview = ({ opinionsFeed, location, act, tutorial }) => {
	return (
		<Row justifyContent="center" mt={2}>
			<Col md={10} sm={11} xs={12} textAlign="left" color="#a9b4cc">
				<OpinionContainer className={tutorial ? 'opinion' : null}>
					{opinionsFeed.map((opinion, index) => (
						<Col xs={8} sm={6} lg={4} key={index} p="6px">
							<OpinionCard>
								<div>
									<b>
										{opinion.title.length > 50
											? opinion.title.slice(0, 47) + '...'
											: opinion.title}
									</b>
								</div>
								<div>
									{opinion.text.length > 200
										? opinion.text.slice(0, 197) + '...'
										: opinion.text}
								</div>
								<UserName>by @{opinion.writtenBy.name}</UserName>
								{/*<OpinionCardBack key={index} md={4} className="OpinionCardBack">
					<Tick>✔</Tick>
					<AffiliationsCount>{opinion.affiliationsCount}</AffiliationsCount>
					<RoundWindow size={60}>
						<Push />
						<img
							src={
								process.env.PUBLIC_URL + `/images/${opinion.writtenBy.picture}`
							}
							alt={opinion.writtenBy.name}
						/>
					</RoundWindow>
					<UserName textAlign="left">@{opinion.writtenBy.name}</UserName>
					<Tags mb={2}>
						{opinion.tags.map(tag => (
							<span className="px-1" key={opinion.id + tag}>
								#{tag}
							</span>
						))}
					</Tags>
				</OpinionCardBack>*/}
							</OpinionCard>
						</Col>
					))}
				</OpinionContainer>
			</Col>
		</Row>
	)
}

export default OpinionPreview
