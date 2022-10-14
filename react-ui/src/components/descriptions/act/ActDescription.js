/*
  Component in charge of loading the description of a given act with the appropriate
  style
*/

//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../../../services/constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

//<STYLE>
const DescriptionRow = styled(Row)`
	justify-content: ${props => props.justifyCont};
	@media (max-width: 540px) {
		justify-content: center;
	}
`

const ItemHeaderDescription = styled.div`
	font-size: 0.9em;
	@media (max-width: 540px) {
		font-size: 1.2em;
	}
`

const ItemDescription = styled.div`
	margin-top: 6px;
	font-size: 0.8em;
	line-height: 20px;
	@media (max-width: 540px) {
		font-size: 1em;
		margin-top: 18px;
	}
`
//</STYLE>

// Declaring props type
type Props = {
	act: string,
	color: string,
	justifyContent: string,
}

const ActDescription = (props: Props) => {
	const { act, color, justifyContent } = props
	return (
		<DescriptionRow justifyContent={justifyContent} mt={2}>
			<Col xs={10} textAlign="left" color={color}>
				<ItemHeaderDescription>
					Ce sur quoi la marque est jugée :
				</ItemHeaderDescription>
				<ItemDescription>
					<ul>
						{CAUSE_AND_ACTS[act].description.fr.map((point, key) => (
							<li key={key}>{point}</li>
						))}
					</ul>
				</ItemDescription>
			</Col>
		</DescriptionRow>
	)
}

export default ActDescription
