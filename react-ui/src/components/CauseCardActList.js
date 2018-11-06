import React from 'react'
import CauseCardAct from './CauseCardAct'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const List = styled(Row)`
	height: 300px;
	overflow-y: auto;

	::-webkit-scrollbar {
		border: none;
		width: 7px;
	}
	::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background-color: #e8e9e8;
	}
`

// Cause Card List calls call card act for each act in the object actgradesObject
const CauseCardActList = ({ actGradesObject, companyId }) => {
	return (
		<List my={20} mx={1} textAlign="left">
			<Col>
				{Object.keys(actGradesObject)
					.filter(identifier => identifier !== '__typename') // filter out the __typename field
					.map(identifier => (
						<CauseCardAct
							key={identifier}
							identifier={identifier}
							grade={actGradesObject[identifier]}
							companyId={companyId}
						/>
					))}
			</Col>
		</List>
	)
}

export default CauseCardActList
