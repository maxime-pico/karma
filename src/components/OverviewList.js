//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'
import ItemOverview from './ItemOverview'

class OverviewList extends React.Component {
	render() {
		const { grades, type, mode } = this.props
		return (
			<div className="row m-5">
				{Object.keys(grades).map(
					identifier =>
						CAUSE_AND_ACTS[identifier] && (
							<div className="col" key={identifier}>
								<ItemOverview
									big={identifier === mode}
									type={type}
									identifier={identifier}
									grade={grades[identifier]}
								/>
							</div>
						),
				)}
			</div>
		)
	}
}

export default OverviewList
