// Resolver querying all the companies in the database
function allCompanies(parent, args, context, info) {
	return context.db.query.companies({}, info)
}

// resolver that gets the cause grades of a specific companyand averages them per cause
// prettier-ignore
async function companyCauseGrades(parent, args, context, info) {
	// get all the cause grades of a specific company
	const causeGrades = await context.db.query.causeGrades(
		{where:
			{ gradedTo: { id: args.companyId } }
		},
			` { cause grade } `,
	)
	
	// test if there are grades so far if not throw error
	if (!causeGrades.length) {
		throw new Error('No grades so far')
	}
	const avgCauseGrades = {}

	// sum aggregate the grades by cause
	causeGrades.forEach(causeGrade => {
		avgCauseGrades[causeGrade.cause] ?
			avgCauseGrades[causeGrade.cause] += causeGrade.grade :
			avgCauseGrades[causeGrade.cause] = causeGrade.grade
	})

	// compute the number of grades per cause
	const numberOfCauses = Object.keys(avgCauseGrades).length
	const divider = (causeGrades.length)/(numberOfCauses)

	// average the grades
	Object.keys(avgCauseGrades).map(function(key, index) {
		avgCauseGrades[key] /= divider
	})

	return avgCauseGrades
}

// resolver that gets the act grades of a specific company and averages them per act
// prettier-ignore
async function companyActGrades(parent, args, context, info) {
	// get all the cause grades of a specific company
	const actGrades = await context.db.query.actGrades(
		{where:
			{ gradedTo: { id: args.companyId } }
		},
			` { act grade } `,
	)
	
	// test if there are grades so far if not throw error
	if (!actGrades.length) {
		throw new Error('No grades so far')
	}
	const avgActGrades = {}

	// sum aggregate the grades by cause
	actGrades.forEach(actGrade => {
		avgActGrades[actGrade.cause] ?
			avgActGrades[actGrade.cause] += actGrade.grade :
			avgActGrades[actGrade.cause] = actGrade.grade
	})

	// compute the number of grades per cause
	const numberOfActs = Object.keys(avgActGrades).length
	const divider = (actGrades.length)/(numberOfActs)

	// average the grades
	Object.keys(avgActGrades).map(function(key, index) {
		avgActGrades[key] /= divider
	})

	return avgActGrades
}

module.exports = {
	allCompanies,
	companyCauseGrades,
	companyActGrades,
}
