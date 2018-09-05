// @flow
import React from 'react'
import { COMPANY_LIST } from '../constants.js'

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
		return (
			<div>
				{company
					? `TODO Soul page of ${company.name}`
					: `! Oups there was an error loading the company !`}
			</div>
		)
	}
}

export default Soul
