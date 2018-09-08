function allCompanies(parent, args, context, info) {
	return context.db.query.companies({}, info)
}

module.exports = {
	allCompanies,
}
