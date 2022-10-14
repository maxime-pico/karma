const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

// resolver that creates a new user from password, email and optionally mail
// and creates an authentification token
async function signup(parent, args, context, info) {
	// encrypt password
	const password = await bcrypt.hash(args.password, 10)

	// create user from arguments (mail and name) and encrypted password
	const user = await context.prisma.user.create({
		data: { ...args, password },
		select: { id: true },
	})

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
	const user = await context.prisma.user.findUnique({
		where: { email: args.email },
		select: {
			id: true,
			password: true,
		},
	})

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
	const causes = ['ENVIRONMENT', 'SOCIAL', 'ETHICS', 'FISCAL']

	// get user id from context thantks to imported function
	const userId = getUserId(context)

	// checks if this user already graded the cause of the company
	const causeGradeExists = await context.prisma.causeGrade.count({
		where: {
			gradedBy: { id: userId },
			gradedTo: { id: companyId },
			cause: 'ENVIRONMENT',
		},
	})

	const causeGrades = []

	if (causeGradeExists) {
		// if already graded then update the grades by first recovering the id of the
		// current grade and then update for each cause
		causes.forEach(async (cause, index) => {
			const causeId = await context.prisma.causeGrade.findFirst({
				where: {
					AND: [
						{ gradedBy: { id: userId } },
						{ gradedTo: { id: companyId } },
						{ cause: cause },
					],
				},
				select: {
					id: true,
				},
			})

			const causeGrade = await context.prisma.causeGrade.update({
				where: { id: causeId.id },
				data: {
					grade: userGrades[index],
				},
				select: {
					id: true,
				},
			})

			causeGrades.push(causeGrade) //Note, doesn't work but is not critical
		})
	} else {
		// if not adds the grade in the database
		userGrades.forEach((grade, index) => {
			causeGrades.push(
				context.prisma.causeGrade.create(
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

async function setOverallKarma(parent, args, context, info) {
	const { companyId } = args
	const causes = ['ENVIRONMENT', 'SOCIAL', 'ETHICS', 'FISCAL']
	let globalKarma = 0
	const avgCauseGrades = {}
	const numberOfCauses = causes.length

	const allCauseGrades = await context.prisma.causeGrade.findMany({
		where: { gradedTo: { id: companyId } },
		select: {
			cause: true,
			grade: true,
		},
	})
	console.log(allCauseGrades)
	const divider = allCauseGrades.length / numberOfCauses

	//if(allCauseGrades.length) {
	allCauseGrades.forEach((causeGrade) => {
		avgCauseGrades[causeGrade.cause]
			? (avgCauseGrades[causeGrade.cause] += causeGrade.grade)
			: (avgCauseGrades[causeGrade.cause] = causeGrade.grade)
	})

	causes.forEach((cause) => {
		const avgCauseGrade = avgCauseGrades[cause] / divider
		globalKarma += avgCauseGrade
		avgCauseGrades[cause] = Math.round(avgCauseGrade * 10) / 10
	})

	globalKarma = Math.round((globalKarma / 4) * 10) / 10

	console.log(globalKarma)

	return context.prisma.company.update({
		where: {
			id: companyId,
		},
		data: {
			karma: globalKarma,
		},
	})
}

// equivalent for act grade
async function gradeAct(parent, args, context, info) {
	const {
		companyId,
		act,
		grade,
		opinionTitle,
		opinionText,
		opinionSources,
		opinionTags,
		opinionId,
		newOpinion,
	} = args
	const userId = getUserId(context)
	const actGradeExists = await context.prisma.actGrade.count({
		where: {
			AND: [
				{ gradedBy: { id: userId } },
				{ gradedTo: { id: companyId } },
				{ act: act },
			],
		},
	})

	if (newOpinion) {
		if (opinionTitle === '' || opinionText === '' || opinionSources === []) {
			throw new Error('Some fields missing to create an opinion')
		}
	} else {
		if (!opinionId) {
			throw new Error('Opinion Id needed')
		}
	}

	const affiliatedTo = newOpinion
		? {
				create: {
					writtenBy: { connect: { id: userId } },
					regardingWho: { connect: { id: companyId } },
					regardingWhat: act,
					title: opinionTitle,
					text: opinionText,
					sources: { set: opinionSources },
					tags: { set: opinionTags },
				},
		  }
		: {
				connect: { id: opinionId },
		  }

	if (actGradeExists) {
		// if already graded then update the grades by first recovering the id of the
		// current grade
		const previousActGrade = await context.prisma.actGrade.findFirst({
			where: {
				gradedBy: { id: userId },
				gradedTo: { id: companyId },
				act: act,
			},
			select: { id: true },
		})

		return await context.prisma.actGrade.update({
			where: { id: previousActGrade[0].id },
			data: {
				grade: grade,
				affiliatedTo: affiliatedTo,
			},
			select: {
				id: true,
			},
		})
	}
	return await context.prisma.actGrade.create(
		{
			data: {
				gradedTo: { connect: { id: companyId } },
				gradedBy: { connect: { id: userId } },
				act: act,
				grade: grade,
				affiliatedTo: affiliatedTo,
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

	return context.prisma.opinion.create(
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
	setOverallKarma,
}
