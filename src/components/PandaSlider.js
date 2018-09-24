import React from 'react'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'

const marks = {
	'-2': '-2',
	'-1': '-1',
	0: '0',
	1: '1',
	2: '2',
}

class PandaSlider extends React.Component {
	constructor(props) {
		super(props)
		this._updateGrade = this.props._updateGrade
		this._setGrade = this.props._setGrade
	}

	state = {
		value: this.props.karma,
	}

	onSliderChange = value => {
		this.setState({
			value,
		})
		this._updateGrade(value)
	}

	onAfterChange = value => {
		this._setGrade(this.props.cause, value)
	}
	render() {
		const { karma, type, disabled } = this.props
		return (
			<div className="row d-flex justify-content-center">
				<div className={type === 'global' ? 'col' : 'col-10'}>
					<Slider
						value={this.state.value}
						onChange={this.onSliderChange}
						onAfterChange={this.onAfterChange}
						min={-2}
						max={2}
						marks={marks}
						step={disabled ? 0.1 : 1}
						included={false}
						defaultValue={karma}
						disabled={disabled}
					/>
				</div>
			</div>
		)
	}
}

export default PandaSlider
