import React from 'react'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ExpandingCol = styled(Col)`
	transition: all 400ms ease;
	flex-shrink: ${props => (props.expanded ? null : 1)};
	flex-grow: ${props => (props.expanded ? 1 : null)};
	margin-bottom: 42px;
`

const OpinionBox = styled.div`
	text-align: left;
	margin: 6px;
	padding: 36px;
	background: white;
	border-radius: 41px;
	border: 9px solid transparent;
	&.selected {
		border-color: #61ff99;
	}
`

const UserName = styled.div`
	font-size: 16px;
	color: #545a66;
`
const OpinionTitle = styled.div`
	font-size: 18px;
	font-weight: 600;
	color: #545a66;
	margin-bottom: 6px;
`
const Tick = styled.div`
	color: #a4cdcc;
	font-weight: 600;
	font-size: 16px;
`

const Tags = styled.div`
	font-size: 16px;
	margin-bottom: 6px;
`
const OpinionText = styled.div`
	color: #545a66;
	font-size: 16px;
	margin-bottom: 12px;
`

const Sources = styled.div`
	color: #a9b4cc;
	font-size: 16px;
	line-height: 16px;
	padding: 5px 0;

	a {
		word-break: break-word;
		overflow-wrap: break-word;
		text-overflow: ellipsis;
	}
`
const SeeMore = styled.span`
	font-size: 16px;
	color: #7f8799;
	font-weight: 600;
	cursor: pointer;
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
		expanded: false,
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

	_expand() {
		this.setState(previousState => {
			previousState.expanded = !previousState.expanded
			return previousState
		})
	}

	render() {
		const { opinion, grading } = this.props
		const expanded = this.state.expanded
		return (
			<ExpandingCol
				md={expanded ? 12 : 6}
				expanded={expanded}
				key={opinion.id}
				className={this.state.selected && 'selected'}
			>
				<OpinionBox>
					<OpinionTitle>Titre : {opinion.title}</OpinionTitle>
					{/*				<Row>
					
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
				</Row>*/}
					<Tags mb={3}>
						{opinion.tags.map(tag => (
							<span className="px-1" key={opinion.id + tag}>
								#{tag}
							</span>
						))}
					</Tags>
					<OpinionText>
						{expanded ? opinion.text : opinion.text.slice(0, 280) + '...'}
					</OpinionText>
					{opinion.sources.map((source, index) => (
						<Sources key={index}>
							<a href={source} target={'_blank'}>
								{this.state.expanded ? source : source.slice(0, 37) + '...'}
							</a>
						</Sources>
					))}
					<Row mt={2}>
						<Col textAlign="left">
							<Tick>✔{opinion.affiliationsCount}</Tick>
						</Col>
						<Col textAlign="right">
							<UserName>@{opinion.writtenBy.name}</UserName>
						</Col>
					</Row>
					<Row>
						<Col textAlign="center">
							<SeeMore onClick={() => this._expand()}>
								voir {expanded ? 'moins' : 'plus'}
							</SeeMore>
						</Col>
					</Row>
				</OpinionBox>
			</ExpandingCol>
		)
	}
}

export default Opinion
