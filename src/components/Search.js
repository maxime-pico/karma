import React from 'react'
import { Link } from 'react-router-dom'
import { COMPANY_LIST } from '../constants'

const Search = () => (
	<div>
		{COMPANY_LIST.map(company => (
			<div>
				<Link to={`/companies/${company.id}`}>{company.name}</Link>
			</div>
		))}
	</div>
)

export default Search
