import React from 'react'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const ExpandingCol = styled(Col)`
	transition: all 400ms ease;
	flex-shrink: ${props => props.flexshrink};
	flex-grow: ${props => props.flexgrow};
	margin-bottom: 42px;
`

const OpinionBox = styled.div`
	text-align: left;
	margin: 6px;
	padding: 36px;
	background: white;
	border-radius: 41px;
	border: 9px solid ${props => props.isSelected};
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
		if (allowed && this.state.selectable) {
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

	_expand(e) {
		this.setState(previousState => {
			previousState.expanded = !previousState.expanded
			return previousState
		})
		e.stopPropagation()
	}

	render() {
		const { opinion, grading, step, tutorial } = this.props
		const expanded = this.state.expanded
		return (
			<ExpandingCol
				md={expanded ? 12 : 6}
				flexshrink={expanded ? null : '1'}
				flexgrow={expanded ? '1' : null}
				className={this.state.selected ? 'selected' : null}
			>
				<OpinionBox
					onClick={() =>
						this._opinionSelected(opinion.id, grading && step === 0)
					}
					isSelected={this.state.selected ? '#D3E2FF' : 'transparent'}
					className={tutorial ? 'opinion' : null}
				>
					<OpinionTitle>{opinion.title}</OpinionTitle>
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
							<a
								href={source}
								target={'_blank'}
								onClick={e => e.stopPropagation()}
							>
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
							<SeeMore onClick={e => this._expand(e)}>
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
