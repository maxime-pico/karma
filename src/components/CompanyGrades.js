//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../constants.js'

class CompanyGrades extends React.Component {
	render() {
		const { grades } = this.props
		return (
			<div>
				{Object.keys(grades).map(
					cause =>
						CAUSE_AND_ACTS[cause] && (
							<div key={cause}>
								{CAUSE_AND_ACTS[cause].name_fr} : {grades[cause]}
							</div>
						),
				)}
			</div>
		)
	}
}

export default CompanyGrades
