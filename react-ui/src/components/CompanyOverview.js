import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Row } from '@smooth-ui/core-sc'
import styled from 'styled-components'

const RoundWindow = styled.div`
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: white;

	img {
		width: ${props => props.size}px;
	}
`
const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`
const Figures = styled.div`
	text-align: left;
	padding-left: 10px;
	color: black;
	font-weight: 600;
	font-size: 1.5em;
	line-height: 1.2em;
`
const Unit = styled.span`
	font-size: 0.7em;
	font-weight: 400;
`

// query that retrieves the company overview from its id
const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
			logo
			opinionsCount
			actGradesCount
			causeGradesCount
		}
	}
`
// Displays the logo, name, grade count and opinion count of a company, receives
// companyId as a prop
class CompanyOverview extends React.Component {
	render() {
		const companyId = this.props.companyId
		return (
			<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const {
						name,
						logo,
						opinionsCount,
						actGradesCount,
						causeGradesCount,
					} = data.companyOverview

					return (
						<Link to={`/company/${companyId}`}>
							<Row alignItems="center">
								<RoundWindow size={80}>
									<Push />
									<img
										src={process.env.PUBLIC_URL + '/images/' + logo}
										alt="company"
									/>
								</RoundWindow>
								<Figures>
									<div>{name}</div>
									<div>
										{causeGradesCount + actGradesCount} <Unit>notes</Unit>
									</div>
									<div>
										{opinionsCount} <Unit>opinions</Unit>
									</div>
								</Figures>
							</Row>
						</Link>
					)
				}}
			</Query>
		)
	}
}

export default CompanyOverview
