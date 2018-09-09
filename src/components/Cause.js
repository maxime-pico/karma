//@flow
import React from 'react'
import { Link } from 'react-router-dom'
import { CAUSE_AND_ACTS } from '../constants.js'

// Cause component: gets the current cause and company from path and displays
// the list of corresponding acts and their grades
class Cause extends React.Component {
	findActs = (list: [{ cause: string, acts: [string] }], cause: string) => {
		const causeAndActs = list.find(item => item.cause === cause)
		if (causeAndActs) return causeAndActs.acts
	}
	render() {
		const cause = decodeURI(this.props.match.params.cause)
		const acts = this.findActs(CAUSE_AND_ACTS, cause)
		const currentPathname = this.props.location.pathname
		if (acts)
			return (
				<div>
					<div>{cause}</div>
					{acts.map(act => (
						<div key={act}>
							<Link to={`${currentPathname}/act/${encodeURI(act)}`}>{act}</Link>
						</div>
					))}
				</div>
			)
		else return 'An error occured'
	}
}

export default Cause
