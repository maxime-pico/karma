import React from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'
import { adjacentAct } from '../utils'
import ItemOverviewQuery from './ItemOverviewQuery'
import CauseAndActExplanation from './CauseAndActExplanation'
import ActsNavButtons from './ActsNavButtons'
import OpinionFeedPreview from './OpinionFeedPreview'

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
class Deliberation extends React.Component {
	constructor(props) {
		super(props)
		const cookies = new Cookies() // get access to cookies
		this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
	}

	state = {
		startGrading: false,
		grading: false,
		modalIsOpen: false,
		loginToGradeModalIsOpen: false,
		userGrade: null,
		affilliation: null,
	}

	_adjacentCause = direction => {
		const { companyId, cause, act } = this.props.match.params
		this.props.history.push({
			pathname: `/company/${companyId}/cause/${cause}/act/${adjacentAct(
				cause,
				act,
				direction,
			)}/`,
		})
	}

	render() {
		const { companyId, cause, act } = this.props.match.params
		return (
			<div className="m-5">
				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<Link to={`/company/${companyId}/cause/${cause}/`}>
								<ItemOverviewQuery
									big={false}
									type={'cause'}
									identifier={cause}
									companyId={companyId}
								/>
							</Link>
						</div>
					</div>
					<div className="row my-4">
						<div className="col">
							<ItemOverviewQuery
								big={true}
								type={'act'}
								identifier={act}
								cause={cause}
								companyId={companyId}
							/>
						</div>
					</div>
					<ActsNavButtons _adjacentCause={this._adjacentCause} />
				</div>

				<div className="container my-5">
					<CauseAndActExplanation identifier={act} />
					<div className="row">
						<div className="col">
							<button type="button" className="btn btn-primary">
								Juger l'acte
							</button>
						</div>
					</div>
					<div className="row my-4">
						<div className="col my-3">
							Filtres – Pour commmencer Chronologique ou Top affilliation
						</div>
					</div>
					<div className="row my-5">
						<div className="col">
							<OpinionFeedPreview act={act} companyId={companyId} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Deliberation
