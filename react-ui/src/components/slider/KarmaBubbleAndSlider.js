import React from 'react'
import PandaSlider from './PandaSlider'
import { convertGradesIntoWords, convertGradesIntoColors } from '../utils'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const RoundWindow = styled.div`
	height: ${props => props.size}px;
	line-height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	margin: auto;
	font-size: 1.5em;
	font-weight: 600;
	&.global {
		background-color: white;
		box-shadow: inset 0 0 12px #bbbbbb;
	}
	&.cause {
		height: calc(${props => props.size}px + 5px);
		line-height: calc(${props => props.size}px + 5px);
		width: calc(${props => props.size}px + 5px);
		background-color: ${props => convertGradesIntoColors(props.grade)};
		background: radial-gradient(
			circle,
			${props => convertGradesIntoColors(props.grade)} 30%,
			#ffffff00
		);
		color: white;
		position: relative;
		border: 2px solid white;
		:before {
			content: ' ';
			position: absolute;
			top: 7px;
			left: 7px;
			right: 7px;
			bottom: 7px;
			border: 3px solid white;
			border-radius: ${props => props.size}px;
		}
		:after {
			content: ' ';
			position: absolute;
			top: 1px;
			left: 1px;
			right: 1px;
			bottom: 1px;
			border: 4px solid white;
			border-radius: ${props => props.size}px;
		}
	}
`
const KarmaDescription = styled.div`
	font-size: 1.1em;
	padding: 5px 0;
	font-weight: 600;
	line-height: 1.7em;
`

const SliderContainer = styled.div`
	width: ${props => props.size}%;
	margin: auto;
`

class KarmaBubbleAndSlider extends React.Component {
	render() {
		const { karma, type } = this.props
		const karmaDescription = convertGradesIntoWords(karma, type).fr
		return (
			<Row justifyContent="center" mb={35}>
				<Col md={type === 'global' && '3'}>
					<RoundWindow size={70} className={type} grade={karma}>
						{karma || 'N/A'}
					</RoundWindow>
					<KarmaDescription>{karmaDescription}</KarmaDescription>
					<SliderContainer size={type === 'global' ? '80' : '100'}>
						<PandaSlider karma={karma} type={type} disabled={true} />
					</SliderContainer>
				</Col>
			</Row>
		)
	}
}

export default KarmaBubbleAndSlider
