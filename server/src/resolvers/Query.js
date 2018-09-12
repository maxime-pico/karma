const { getUserId } = require('../utils')

// Resolver querying the user info from token
function getUserInfoFromContext(parent, args, context, info) {
	const userId = getUserId(context)
	console.log('coucou')
	console.log(userId)
	return context.db.query.user(
		{ where: { id: userId } },
		`{ id name email picture status }`,
	)
}

// Resolver querying all the companies in the database
function company(parent, args, context, info) {
	return context.db.query.company(
		{
			where: { id: args.companyId },
		},
		`{name}`,
	)
}

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

// resolver that gets the needed info for a specific user to display its bubble
function userBubbleQuery(parent, args, context, info) {
	const userBubbleInfo = context.db.query.user(
		{
			where: { id: args.userId },
		},
		` { name picture status } `,
	)
	if (!userBubbleInfo) {
		throw new Error('User does not exist')
	}
	return userBubbleInfo
}

// resolver that gets the needed info for a specific Company to display its Overview
async function companyOverview(parent, args, context, info) {
	// get the info from a company query. Unfortunately at the moment of coding
	// prisma doesn't allow to query the count on a return field right away
	const companyOverviewInfo = await context.db.query.company(
		{
			where: { id: args.companyId },
		},
		` { name logo opinions{ id } actGrades{ id } causeGrades{ id } } `,
	)

	// test existence
	if (!companyOverviewInfo) {
		throw new Error('Company does not exist')
	}

	// add count fields to result from query
	companyOverviewInfo.opinionsCount = companyOverviewInfo.opinions.length
	companyOverviewInfo.actGradesCount = companyOverviewInfo.actGrades.length
	companyOverviewInfo.causeGradesCount =
		companyOverviewInfo.causeGrades.length / 5

	return companyOverviewInfo
}

// resolver that gets a list of the first $first opinions starting from the $skip
// for a specific company and adds an affiliation count field to the opinions
// prettier-ignore
async function opinionsFeed(parent, args, context, info){
  const { companyId, first, skip } = args // destructure input arguments
  
  const opinionsPreview = await context.db.query.opinions({
      first: first,
      skip: skip,
      where: { regardingWho: { id: companyId } }
    },
    ` { createdAt title text regardingWhat tags sources writtenBy{ name picture } affiliations{ id } } `
  )

	// if one or more opinions are returned then manipulate them to add the count
	// field
  if(opinionsPreview.length){
		opinionsPreview.forEach(opinion => {
			opinion.affiliationsCount =  opinion.affiliations.length
		})
  }

  return opinionsPreview
}

module.exports = {
	getUserInfoFromContext,
	company,
	allCompanies,
	companyCauseGrades,
	companyActGrades,
	userBubbleQuery,
	companyOverview,
	opinionsFeed,
}
