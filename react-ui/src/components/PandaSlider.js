import React from 'react'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'
import styled from 'styled-components'

const marks = {
	'-2': '-2',
	'-1': '-1',
	0: '0',
	1: '1',
	2: '2',
}

const CustomSlider = styled(Slider)`
	.rc-slider-handle {
		height: 40px;
		width: 40px;
		margin-left: -21px;
		margin-top: -19px;
		background: transparent url(${process.env.PUBLIC_URL}/images/pandahead.png)
			scroll no-repeat 0px 5px;
		background-size: 40px;
		border: none;
		border-radius: 0;
	}
	.rc-slider-handle[style] {
		background-color: transparent;
	}
	&.rc-slider {
		background: linear-gradient(
			to left,
			#85d8e6,
			#85d8e6 16.36%,
			#b3d7f2 30.36%,
			#add5f3 39.8%,
			#c1bddf 50%,
			#c34c58 71.69%,
			#d02417 92%,
			#d02417
		);
		height: 17px;
	}
	.rc-slider-rail {
		background-color: transparent;
	}
	.rc-slider-dot[style] {
		border: none;
		background-color: transparent;
	}
	.rc-slider-mark {
		top: 25px;
	}
	.rc-slider-mark-text {
		color: black;
	}
`

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
		const cause = this.props.cause
		if (cause) {
			this._setGrade(cause, value)
			console.log(cause)
		} else {
			this._setGrade(value)
		}
	}
	render() {
		const { karma, type, disabled } = this.props
		return (
			<div className="row d-flex justify-content-center">
				<div className={type === 'global' ? 'col' : 'col-10'}>
					<CustomSlider
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
