import React from 'react'
import { Link } from 'react-router-dom'
import { COMPANY_LIST } from '../constants'

// Search component: displays the list of companies in the database
const Search = () => (
	<div>
		{COMPANY_LIST.map(company => (
			<div>
				<Link to={`/company/${company.id}`}>{company.name}</Link>
			</div>
		))}
	</div>
)

export default Search
