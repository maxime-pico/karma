// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { COMPANY_LIST, CAUSE_AND_ACTS } from '../constants.js'

// Soul component: gets the current company from path and displays the list of
// corresponding causes and their grades
class Soul extends React.Component {
	findCompany = (
		list: [{ id: number, name: string }],
		id: number,
	): { id: number, name: string } | void => {
		const company = list.find(item => item.id === id)
		return company
	}
	render() {
		const company = this.findCompany(
			COMPANY_LIST,
			parseInt(this.props.match.params.companyId, 10),
		)
		if (company)
			return (
				<div>
					<div> TODO Soul page of {company.name} </div>
					{CAUSE_AND_ACTS.map(item => {
						return (
							<div>
								<div>
									<Link
										to={`/company/${company.id}/cause/${encodeURI(item.cause)}`}
									>
										{item.cause}
									</Link>

									 :
								</div>
								<ul>
									{item.acts.map(act => (
										<li key={act}>
											<Link
												to={`/company/${company.id}/cause/${encodeURI(
													item.cause,
												)}/act/${encodeURI(act)}`}
											>
												{act}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)
					})}
				</div>
			)
		else return <div>! Oups there was an error loading the company !</div>
	}
}

export default Soul
