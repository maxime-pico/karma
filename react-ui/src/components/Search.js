// @flow
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SearchResult from './SearchResult'
import styled from 'styled-components'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

const Title = styled.div`
	font-size: 30px;
	font-weight: 900;
	color: #545a66;
	text-align: left;
	margin-bottom: 42px;
`

/*const SubTitle = styled.div`
	font-size: 16px;
	color: #7f8799;
	text-align: left;
	margin-bottom: 42px;
`*/

// query that retireves the list of all companies
const COMPANY_LIST = gql`
	query CompanyList {
		allCompanies(orderBy: name_ASC) {
			id
			name
			logo
		}
	}
`

// Search component: displays the list of companies in the database
class Search extends React.Component {
	render() {
		return (
			<Query query={COMPANY_LIST}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>

					const companyList = data.allCompanies

					return (
						<Grid>
							<Row justifyContent={{ md: 'center' }}>
								<Col md={8}>
									<Title>Les marques déjà sur Karma Panda :</Title>
									{/*<SubTitle>
										Les 3 marques les plus notées (cool pour découvrir la
										plateforme) :
									</SubTitle>*/}
									<Row my={4} justifyContent={{ md: 'center' }}>
										{companyList.map(company => (
											<SearchResult
												name={company.name}
												id={company.id}
												logo={company.logo}
											/>
										))}
									</Row>
								</Col>
							</Row>
						</Grid>
					)
				}}
			</Query>
		)
	}
}

export default Search
