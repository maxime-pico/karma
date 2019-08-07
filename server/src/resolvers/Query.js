const { getUserId, CAUSE_AND_ACTS } = require('../utils')

// Resolver querying the user info from token
function getUserInfoFromContext(parent, args, context, info) {
  const userId = getUserId(context)
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

  const conditions = { or: [], and: [] };

  if (typeof args.filter !== 'undefined') {
    if (args.filter.length) {
      conditions.and.push({ name_contains: args.filter });
    }
  }

  if (typeof args.categories !== 'undefined') {
    const cats = args.categories.split(',');
    if (cats.length) {
      cats.forEach(cat => {
        if (cat.length)
          conditions.or.push({ category_some: { id: cat } });
      });
    }
  }

  if (typeof args.karma !== 'undefined') {

  }

  let where = {};
  if (conditions.or.length && conditions.and.length) {
    where = { OR: conditions.or, AND: conditions.and };
  } else {
    if (conditions.or.length)
      where = { OR: conditions.or };

    if (conditions.and.length)
      where = { AND: conditions.and };
  }

  const companies = context.db.query.companies(
    {
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    },
    info,
  );

  return companies;
}

// Resolver querying all the companies in the database
function allCompanyCategories(parent, args, context, info) {
  const where = {}

  const companyCategories = context.db.query.companyCategories(
    {
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    },
    info,
  )

  return companyCategories
}

// resolver that gets the cause grades of a specific companyand averages them per cause
// prettier-ignore
async function companyCauseGrades(parent, args, context, info) {

  // test if company exists
  const companyExists = await context.db.exists.Company({
    id: args.companyId
  })

  if (!companyExists) {
    throw new Error('This company does not exist')
  }

  // get all the cause grades of a specific company
  const causeGrades = await context.db.query.causeGrades(
    {
      where:
        { gradedTo: { id: args.companyId } }
    },
    ` { cause grade } `,
  )

  const avgCauseGrades = {}

  // test if there are grades so far if not throw error
  if (!causeGrades.length) {
    // throw new Error('No grades so far')
    avgCauseGrades.ENVIRONMENT = null
    avgCauseGrades.ETHICS = null
    avgCauseGrades.FISCAL = null
    avgCauseGrades.SOCIAL = null
    avgCauseGrades.overallKarma = null
  }
  else {
    // sum aggregate the grades by cause
    causeGrades.forEach(causeGrade => {
      avgCauseGrades[causeGrade.cause] ?
        avgCauseGrades[causeGrade.cause] += causeGrade.grade :
        avgCauseGrades[causeGrade.cause] = causeGrade.grade
    })

    // compute the number of grades per cause
    const causes = Object.keys(avgCauseGrades)
    const numberOfCauses = causes.length
    const divider = (causeGrades.length) / (numberOfCauses)
    avgCauseGrades.overallKarma = 0

    // average the grades
    causes.forEach(cause => {
      const avgCauseGrade = avgCauseGrades[cause] / divider
      avgCauseGrades.overallKarma += avgCauseGrade
      avgCauseGrades[cause] = Math.round(avgCauseGrade * 10) / 10
    })

    avgCauseGrades.overallKarma = Math.round((avgCauseGrades.overallKarma / 4) * 10) / 10
  }

  return avgCauseGrades
}

// resolver that gets the act grades of a specific company and averages them per act
// prettier-ignore
async function companyActGrades(parent, args, context, info) {
  // get all the cause grades of a specific company
  const actGrades = await context.db.query.actGrades(
    {
      where:
        { gradedTo: { id: args.companyId } }
    },
    ` { act grade } `,
  )

  const avgActGrades = {}
  const numberOfGradesPerAct = {}

  // sum aggregate the grades by cause
  actGrades.forEach(actGrade => {
    if (avgActGrades[actGrade.act]) {
      avgActGrades[actGrade.act] += actGrade.grade
      numberOfGradesPerAct[actGrade.act] += 1
    } else {
      avgActGrades[actGrade.act] = actGrade.grade
      numberOfGradesPerAct[actGrade.act] = 1
    }
  })

  const acts = Object.keys(avgActGrades)

  // average the grades
  acts.forEach(act => {
    const avgActGrade = avgActGrades[act] / numberOfGradesPerAct[act]
    avgActGrades[act] = Math.round(avgActGrade * 10) / 10
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
    companyOverviewInfo.causeGrades.length / 4

  return companyOverviewInfo
}

// resolver that gets a list of the first $first opinions starting from the $skip
// for a specific company and adds an affiliation count field to the opinions
// prettier-ignore
async function opinionsFeed(parent, args, context, info) {
  const { companyId, first, skip, act } = args // destructure input arguments

  const opinionsPreview = await context.db.query.opinions({
    first: first,
    skip: skip,
    where: { regardingWho: { id: companyId }, regardingWhat: act }
  },
    ` { id createdAt title text regardingWhat tags sources writtenBy{ name picture } affiliations{ id } } `
  )

  // if one or more opinions are returned then manipulate them to add the count
  // field
  if (opinionsPreview.length) {
    opinionsPreview.forEach(opinion => {
      opinion.affiliationsCount = opinion.affiliations.length
    })
  }

  return opinionsPreview
}

// resolver that counts the number of opinions of a specific company (args.companyId)
// for a specific act (args.act)
async function opinionsActCount(parent, args, context, info) {
  const { companyId, act } = args // destructure arguments

  const opinions = await context.db.query.opinions(
    {
      where: { regardingWho: { id: companyId }, regardingWhat: act },
    },
    ` { id } `,
  )
  if (opinions) return { act: act, count: opinions.length }
  return { act: act, count: 0 }
}

// resolver that counts the number of grades and opinions of a specific company (args.companyId)
// for a specific cause (args.cause)
async function opinionsAndGradesCauseCount(parent, args, context, info) {
  const { companyId, cause } = args // destructure arguments

  const opinions = await context.db.query.opinions(
    {
      where: {
        regardingWho: { id: companyId },
        regardingWhat_in: CAUSE_AND_ACTS[cause].acts,
      },
    },
    ` { id affiliations { id } } `,
  )
  if (opinions) {
    var gradesCount = 0
    opinions.forEach(opinion => {
      gradesCount += opinion.affiliations.length
    })
    return { opinionsCount: opinions.length, gradesCount: gradesCount }
  }
  return { opinionsCount: null, gradesCount: null }
}

module.exports = {
  getUserInfoFromContext,
  company,
  allCompanies,
  allCompanyCategories,
  companyCauseGrades,
  companyActGrades,
  userBubbleQuery,
  companyOverview,
  opinionsFeed,
  opinionsActCount,
  opinionsAndGradesCauseCount,
}
