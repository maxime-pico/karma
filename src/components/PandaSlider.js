import React from 'react'
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'

const style = { width: 200, margin: 'auto', marginBottom: '20px' }

const marks = {
	'-2': '-2',
	'-1': '-1',
	0: '0',
	1: '1',
	2: '2',
}

const PandaSlider = props => (
	<div style={style}>
		<Slider
			min={-2}
			max={2}
			marks={marks}
			step={0.1}
			included={false}
			defaultValue={props.karma}
			disabled={true}
		/>
	</div>
)

export default PandaSlider
