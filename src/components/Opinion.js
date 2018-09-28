import React from 'react'

class Opinion extends React.Component {
	constructor(props) {
		super(props)
		this._selectOpinion = this.props._selectOpinion
		this.affiliation = this.props.affiliation
		this.opinionId = this.props.opinionId
	}

	state = {
		selected: false,
		selectable: !this.affiliation || this.affiliation === this.opinionId,
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.affiliation !== state.selectable) {
	// 		return {
	// 			selected: state.selected,
	// 			selectable: !props.affiliation || props.affiliation === props.opinionId,
	// 		}
	// 	}
	// 	return null
	// }

	// componentDidUpdate(prevProps) {
	// 	// Typical usage (don't forget to compare props):
	// 	if (this.props.affiliation !== prevProps.affiliation) {
	// 		this._setGrade({
	// 			selected: this.state.selected,
	// 			selectable:
	// 				!this.props.affiliation ||
	// 				this.props.affiliation === this.props.opinionId,
	// 		})
	// 	}
	// }

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
		const style = {
			border: '1pt solid',
			borderColor: this.state.selected ? 'green' : 'black',
			borderRadius: '25px',
		}

		const breakWord = {
			wordBreak: 'break-word',
			overflowWrap: 'break-word',
			textOverflow: 'ellipsis',
		}

		return (
			<div
				key={opinion.id}
				className="row d-flex justify-content-left p-4 m-4"
				style={style}
			>
				<div className="col-2 text-center">
					<div className="row">
						<div className="col">
							<img
								src={
									process.env.PUBLIC_URL +
									`/images/${opinion.writtenBy.picture}`
								}
								width="50"
								height="50"
								alt={opinion.writtenBy.name}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col">@{opinion.writtenBy.name}</div>
					</div>
				</div>
				<div className="col text-left">
					<div className="row my-1">
						<div className="col-6 p-0">Titre : {opinion.title}</div>
						<div className="col">
							Nombre d'affiliations : {opinion.affiliationsCount}
						</div>
						{grading &&
							this.state.selectable && (
								<div className="col">
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => this._opinionSelected(opinion.id, grading)}
									>
										{this.state.selected
											? 'Annuler'
											: "M'afillier a cette opinion"}
									</button>
								</div>
							)}
					</div>
					<div className="row mb-3">
						{opinion.tags.map(tag => (
							<span className="px-1" key={opinion.id + tag}>
								#{tag}
							</span>
						))}
					</div>
					<div className="row mb-2">{opinion.text}</div>
					<div className="row">
						{opinion.sources.map((source, index) => (
							<div className="row" key={index}>
								<div className="col">
									<a style={breakWord} href={source} target={'_blank'}>
										{source}
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Opinion
