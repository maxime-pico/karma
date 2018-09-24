const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

// resolver that creates a new user from password, email and optionally mail
// and creates an authentification token
async function signup(parent, args, context, info) {
	// encrypt password
	const password = await bcrypt.hash(args.password, 10)

	// create user from arguments (mail and name) and encrypted password
	const user = await context.db.mutation.createUser(
		{
			data: { ...args, password },
		},
		`{ id }`,
	)

	// generate a JWT token from user id
	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

// resolver that gets the id and encrypted password of a user from the email
// and compares it with what the user gave
// if success returns an authentification token
async function login(parent, args, context, info) {
	// get id and password from (unique) email
	const user = await context.db.query.user(
		{ where: { email: args.email } },
		` { id password } `,
	)

	// check if exists
	if (!user) {
		throw new Error('No such user found')
	}

	// check password
	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error('Invalid password')
	}

	// create JWT token from user id
	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

// resolver that gets user id from context and then checks if user did not
// already grade the company on this cause if not, creates a new grade cause
// from the arguments given by the user
async function gradeCauses(parent, args, context, info) {
	const { companyId, userGrades } = args
	const causes = ['ENVIRONMENT', 'ANIMALS', 'SOCIAL', 'ETHICS', 'FISCAL']

	// get user id from context thantks to imported function
	const userId = getUserId(context)

	// checks if this user already graded the cause of the company
	const causeGradeExists = await context.db.exists.CauseGrade({
		gradedBy: { id: userId },
		gradedTo: { id: companyId },
		cause: 'ENVIRONMENT',
	})

	const causeGrades = []

	if (causeGradeExists) {
		// if already graded then update the grades by first recovering the id of the
		// current grade and then update for each cause
		causes.forEach(async (cause, index) => {
			const causeId = await context.db.query.causeGrades(
				{
					where: {
						gradedBy: { id: userId },
						gradedTo: { id: companyId },
						cause: cause,
					},
				},
				` { id } `,
			)

			const causeGrade = await context.db.mutation.updateCauseGrade(
				{
					where: causeId[0],
					data: {
						grade: userGrades[index],
					},
				},
				` { id } `,
			)
			causeGrades.push(causeGrade) //doesn't work
		})
	} else {
		// if not adds the grade in the database
		userGrades.forEach((grade, index) => {
			causeGrades.push(
				context.db.mutation.createCauseGrade(
					{
						data: {
							gradedTo: { connect: { id: companyId } },
							gradedBy: { connect: { id: userId } },
							cause: causes[index],
							grade: grade,
						},
					},
					info,
				),
			)
		})
	}

	return causeGrades
}

// idem cause grade with opinion id added as an argument
async function gradeAct(parent, args, context, info) {
	const { companyId, act, grade, opinionId } = args
	const userId = getUserId(context)
	const actGradeExists = await context.db.exists.ActGrade({
		gradedBy: { id: userId },
		gradedTo: { id: companyId },
		act: act,
	})
	if (actGradeExists) {
		throw new Error(`Already graded Act for Company: ${companyId}`)
	}
	return context.db.mutation.createActGrade(
		{
			data: {
				gradedTo: { connect: { id: companyId } },
				gradedBy: { connect: { id: userId } },
				act: act,
				grade: grade,
				affiliatedTo: { connect: { id: opinionId } },
			},
		},
		info,
	)
}

// resolver that gets user id from context and then posts opinion thanks to
// the arguments given
async function postOpinion(parent, args, context, info) {
	const { companyId, act, title, text, sources, tags } = args

	// get user id from context thantks to imported function
	const userId = getUserId(context)

	return context.db.mutation.createOpinion(
		{
			data: {
				regardingWho: { connect: { id: companyId } },
				regardingWhat: act,
				title: title,
				text: text,
				sources: { set: sources },
				tags: { set: tags },
				writtenBy: { connect: { id: userId } },
			},
		},
		info,
	)
}

module.exports = {
	signup,
	login,
	gradeCauses,
	gradeAct,
	postOpinion,
}
