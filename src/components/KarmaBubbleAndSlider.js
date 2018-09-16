import React from 'react'
import PandaSlider from './PandaSlider'
import { convertGradesIntoWords } from '../utils'

class KarmaBubbleAndSlider extends React.Component {
	render() {
		const { karma, type } = this.props
		const karmaDescription = convertGradesIntoWords(karma, type).fr
		return (
			<div>
				<div>{karma}</div>
				<div>{karmaDescription}</div>
				<PandaSlider karma={karma} />
			</div>
		)
	}
}

export default KarmaBubbleAndSlider
