import React from 'react'
import PandaSlider from './PandaSlider'
import { convertGradesIntoWords } from '../utils'
import { Row, Col } from '@smooth-ui/core-sc'
import styled from 'styled-components'

const RoundWindow = styled.div`
	height: ${props => props.size}px;
	line-height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: white;
	margin: auto;
	font-size: 1.5em;
	font-weight: 600;
	box-shadow: inset 0 0 12px #bbbbbb;
`
const KarmaDescription = styled.div`
	font-size: 1.1em;
	padding: 5px 0;
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
			<Row justifyContent="center" style={{ margin: '35px 0' }}>
				<Col md={type === 'global' && '3'}>
					<RoundWindow size={70}>{karma}</RoundWindow>
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
