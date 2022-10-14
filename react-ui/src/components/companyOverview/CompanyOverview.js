/*
Component used to display the logo of a company in a rounded window as well
as its name. Used in the header components.
*/

// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Row } from '@smooth-ui/core-sc'
import styled from 'styled-components'

// <STYLE>
const Logo = styled(Row)`
	display: block;
	@media (max-width: 540px) {
		display: ${props => props.logo};
	}
`
const RoundWindow = styled.div`
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: white;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: ${props => props.size - 40}px;
	}
`
const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`
const CompanyName = styled.div`
	color: white;
	margin: auto;
	margin-top: 12px;
	@media (max-width: 540px) {
		font-size: 1.2em;
		margin: 24px auto;
	}
`
// </STYLE>

// query that retrieves the company overview from its id
const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
			logo
		}
	}
`

//Declaring prop types
type Props = {
	companyId: string,
	displayLogo: boolean,
}

// Displays the logo and name of a company, receives companyId as a prop
const CompanyOverview = (props: Props) => {
	const { companyId, displayLogo } = props
	return (
		<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
			{({ loading, error, data }) => {
				if (loading) return <div> Loading... </div>
				if (error) return <div> Error: {error.message} </div>
				const { name, logo } = data.companyOverview

				return (
					<Link to={`/company/${companyId}`}>
						<Logo alignItems="center" logo={displayLogo ? 'initial' : 'none'}>
							<RoundWindow size={140}>
								<Push />
								<img
									src={process.env.PUBLIC_URL + '/images/' + logo}
									alt="company"
								/>
							</RoundWindow>
						</Logo>
						<Row>
							<CompanyName>{name}</CompanyName>
						</Row>
					</Link>
				)
			}}
		</Query>
	)
}
export default CompanyOverview
