/*
  Component in charge of loading the description of a given act with the appropriate
  style
*/

//@flow
import React from 'react'
import { CAUSE_AND_ACTS } from '../../../services/constants.js'
import { Row, Col, styled } from '@smooth-ui/core-sc'

//<STYLE>
const ItemHeaderDescription = styled.div`
	font-size: 16px;
`

const ItemDescription = styled.div`
	margin-top: 6px;
	font-size: 12px;
	line-height: 20px;
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
		<Row justifyContent={justifyContent} mt={2}>
			<Col md={10} textAlign="left" color={color}>
				<ItemHeaderDescription>
					Ce sur quoi la marque a été jugée :
				</ItemHeaderDescription>
				<ItemDescription>
					<ul>
						{CAUSE_AND_ACTS[act].description.fr.map((point, key) => (
							<li key={key}>{point}</li>
						))}
					</ul>
				</ItemDescription>
			</Col>
		</Row>
	)
}

export default ActDescription
