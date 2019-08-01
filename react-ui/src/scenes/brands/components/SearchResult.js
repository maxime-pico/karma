/*
Here is a component called by Search.js that renders the brand "cards" on the
/brand page, based on the information provided by the parent component
 */

// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Row, Col } from '@smooth-ui/core-sc'

// <STYLE>
const ResultCard = styled.div`
	background-color: white;
	border-radius: 30px;
	min-height: 80px;
	font-weight: 500;
	width: 140px;
	margin: auto;
	border: solid 9px transparent;
	box-sizing: border-box;

	&:hover {
		border: solid 9px #cbcbcb;
		cursor: pointer;
	}
`

const CompanyName = styled.div`
	color: #a9b4cc;
	font-size: 0.95rem;
`
// </STYLE>

// Declare types of expected props
type Props = {
	name: string,
	id: string,
	logo: string,
}

// SearchResult component: displays the company card based on the name, and
// logo provided. Also adds a link to the relevant brand page based on the id
const SearchResult = (props: Props) => (
	<Col md={3} my={3}>
		<Link to={`/company/${props.id}`} style={{ textDecoration: 'none' }}>
			<ResultCard>
				<Row>
					<Col style={{ height: '110px' }}>
						<span
							style={{
								display: 'inline-block',
								height: '100%',
								verticalAlign: 'middle',
							}}
						/>
						<img
							src={process.env.PUBLIC_URL + '/images/' + props.logo}
							width="80"
							alt="company"
						/>
					</Col>
				</Row>
			</ResultCard>
			<Row>
				<Col py={1}>
					<CompanyName>{props.name}</CompanyName>
				</Col>
			</Row>
		</Link>
	</Col>
)

export default SearchResult
