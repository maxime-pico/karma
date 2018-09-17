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

const PandaSlider = ({ karma, type }) => {
	return (
		<div className="row d-flex justify-content-center">
			<div className={type === 'global' ? 'col' : 'col-10'}>
				<Slider
					min={-2}
					max={2}
					marks={marks}
					step={0.1}
					included={false}
					defaultValue={karma}
					disabled={true}
				/>
			</div>
		</div>
	)
}

export default PandaSlider
