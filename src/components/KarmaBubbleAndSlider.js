import React from 'react'
import PandaSlider from './PandaSlider'
import { convertGradesIntoWords } from '../utils'

class KarmaBubbleAndSlider extends React.Component {
	render() {
		const { karma, type } = this.props
		const karmaDescription = convertGradesIntoWords(karma, type).fr
		return (
			<div className="row d-flex justify-content-center my-4">
				<div className={type === 'global' ? 'col-3' : 'col'}>
					<div className="row text-center">
						<div className="col">{karma}</div>
					</div>
					<div className="row text-center">
						<div className="col">{karmaDescription}</div>
					</div>
					<PandaSlider karma={karma} type={type} disabled={true} />
				</div>
			</div>
		)
	}
}

export default KarmaBubbleAndSlider
