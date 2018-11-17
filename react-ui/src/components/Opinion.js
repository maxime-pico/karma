import React from 'react'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const OpinionBox = styled(Row)`
	background: white;
	box-shadow: inset 0 0 20px #d4d4d4;
	border-radius: 55px;
	&.selected {
		box-shadow: 0 0 34px #61ff99;
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
	font-size: 1.2em;
	white-space: pre-line;
`
const OpinionButtons = styled.button`
	font-size: 1.2em;
	background: linear-gradient(
		to right,
		#85d8e6,
		#b3d7f2 22.14%,
		#baacd4 41.51%,
		#af8cc0 56.2%,
		#d02417 98.46%,
		#d02417
	);
	box-shadow: 0px 0px 32px #ada9a98c;
	border-radius: 30px;
	border: none;

	:hover {
		color: #989898;
		background: white;
	}

	&.btn-danger {
		color: white;
		background: #c20e13;
		box-shadow: 3px 5px 18px #9c9c9c;
		border-radius: 30px;
		border: none;

		:hover,
		:focus:hover {
			background: #fa7377;
			box-shadow: 0px 0px 32px white;
		}
	}
`

const Sources = styled.div`
	color: #5d5c5c;
	line-height: 1.1em;
	padding: 5px 0;

	a {
		word-break: break-word;
		overflow-wrap: break-word;
		text-overflow: ellipsis;
	}

	a:hover {
		font-weight: 600;
	}
`

class Opinion extends React.Component {
	constructor(props) {
		super(props)
		this._selectOpinion = this.props._selectOpinion
	}

	state = {
		selected: false,
		selectable:
			!this.props.affiliation ||
			this.props.affiliation === this.props.opinion.id,
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.affiliation !== prevProps.affiliation) {
			this.setState({
				selected: this.state.selected,
				selectable:
					!this.props.affiliation ||
					this.props.affiliation === this.props.opinion.id,
			})
		}
	}

	_opinionSelected = (opinionId, allowed) => {
		if (allowed) {
			if (this.state.selected) {
				this._selectOpinion(null)
			} else {
				this._selectOpinion(opinionId)
			}
			this.setState(previousState => {
				previousState.selected = !previousState.selected
				return previousState
			})
		}
	}

	render() {
		const { opinion, grading } = this.props

		return (
			<OpinionBox
				justifyContent="left"
				p={4}
				m={4}
				key={opinion.id}
				className={this.state.selected && 'selected'}
			>
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
						<Col md={1}>
							<Tick>✔</Tick>
							<AffiliationsCount>{opinion.affiliationsCount}</AffiliationsCount>
						</Col>
						<Col>
							{grading &&
								this.state.selectable && (
									<OpinionButtons
										type="button"
										className={`btn btn-${
											this.state.selected ? 'danger' : 'primary'
										}`}
										onClick={() => this._opinionSelected(opinion.id, grading)}
									>
										{this.state.selected
											? 'Annuler'
											: "M'afillier a cette opinion"}
									</OpinionButtons>
								)}
						</Col>
					</Row>
					<Tags mb={3}>
						{opinion.tags.map(tag => (
							<span className="px-1" key={opinion.id + tag}>
								#{tag}
							</span>
						))}
					</Tags>
					<Row p={1}>
						<OpinionText>{opinion.text}</OpinionText>
					</Row>
					<Row px={1} pt={1}>
						Sources :
					</Row>
					<Row px={1}>
						{opinion.sources.map((source, index) => (
							<Sources key={index}>
								<a href={source} target={'_blank'}>
									{source}
								</a>
							</Sources>
						))}
					</Row>
				</Col>
			</OpinionBox>
		)
	}
}

export default Opinion
