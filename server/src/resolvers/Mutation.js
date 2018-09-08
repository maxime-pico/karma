const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.db.mutation.createUser(
		{
			data: { ...args, password },
		},
		`{ id }`,
	)

	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

async function login(parent, args, context, info) {
	const user = await context.db.query.user(
		{ where: { email: args.email } },
		` { id password } `,
	)
	if (!user) {
		throw new Error('No such user found')
	}

	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error('Invalid password')
	}

	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

async function gradeCause(parent, args, context, info) {
	const { companyId, cause, grade } = args
	const userId = getUserId(context)
	const causeGradeExists = await context.db.exists.CauseGrade({
		gradedBy: { id: userId },
		gradedTo: { id: companyId },
	})
	if (causeGradeExists) {
		throw new Error(`Already graded Cause for Company: ${companyId}`)
	}
	return context.db.mutation.createCauseGrade(
		{
			data: {
				gradedTo: { connect: { id: companyId } },
				gradedBy: { connect: { id: userId } },
				cause: cause,
				grade: grade,
			},
		},
		info,
	)
}

async function gradeAct(parent, args, context, info) {
	const { companyId, act, grade, opinionId } = args
	const userId = getUserId(context)
	const actGradeExists = await context.db.exists.ActGrade({
		gradedBy: { id: userId },
		gradedTo: { id: companyId },
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

async function postOpinion(parent, args, context, info) {
	const { companyId, act, title, text, sources, tags } = args
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
	gradeCause,
	gradeAct,
	postOpinion,
}
