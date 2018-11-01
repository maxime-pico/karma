import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Row, Col } from '@smooth-ui/core-sc'

const ResultCard = styled.div`
	background-color: white;
	margin: 10px;
	padding: 20px 10px 10px 10px;
	border-radius: 25px;
	min-height: 140px;
	font-weight: 500;

	&:hover {
		box-shadow: 0 0 27px white;
		cursor: pointer;
	}
`

const CompanyName = styled.div`
	color: black;
`

const SearchResult = ({ name, id, logo }) => (
	<Col md={4} key={name}>
		<Link to={`/company/${id}`} style={{ textDecoration: 'none' }}>
			<ResultCard>
				<Row>
					<Col>
						<img
							src={process.env.PUBLIC_URL + '/images/' + logo}
							width="60"
							height="60"
							alt="company"
						/>
					</Col>
				</Row>
				<Row>
					<Col py={1}>
						<CompanyName>{name}</CompanyName>
					</Col>
				</Row>
			</ResultCard>
		</Link>
	</Col>
)

export default SearchResult
