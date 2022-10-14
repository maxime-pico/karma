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
		margin-top: -13px;
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
			to right,
			#ad222d,
			#ad222d 20%,
			#ae576e 20%,
			#ae576e 40%,
			#d7d0c8 40%,
			#d7d0c8 60%,
			#98e0dd 60%,
			#98e0dd 80%,
			#53cdca 80%,
			#53cdca
		);
		height: 28px;
		border-radius: 25px;
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
		display: none;
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
		value: this.props.karma ? this.props.karma : 0,
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
		} else {
			this._setGrade(value)
		}
	}
	render() {
		const { karma, type, disabled } = this.props
		return (
			<div className="row d-flex justify-content-center mt-1">
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
