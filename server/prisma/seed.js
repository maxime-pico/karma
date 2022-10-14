const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
	const user1 = await prisma.user.upsert({
		where: { email: 'test@test.com' },
		update: {},
		create: {
			email: 'test@test.com',
			password: 'test',
		},
	})

	const user2 = await prisma.user.upsert({
		where: { email: 'test2@test.com' },
		update: {},
		create: {
			email: 'test2@test.com',
			password: 'test',
		},
	})

	const company1 = await prisma.company.upsert({
		where: { name: 'H&M' },
		update: {},
		create: {
			name: 'H&M',
			logo: 'hm.png',
			actGrades: {
				create: {
					gradedBy: { connect: { email: 'test@test.com' } },
					act: 'CLIMATE_CHANGE',
					grade: -1,
					affiliatedTo: {
						create: {
							writtenBy: { connect: { email: 'test@test.com' } },
							regardingWho: { connect: { name: 'H&M' } },
							regardingWhat: 'CLIMATE_CHANGE',
							title: 'H&M leader du fast fashion',
							text: "Les moins : 10% des gaz à effet de serre pour l'industrie textile, pratique du fast fashion, la plupart des fournisseurs en asie. Les plus : reduction des emissions de CO2 de 350000t/an en 2013 à 65000t/an en 2017, objectifs officiels et ambitieux sur le sujet",
							sources: {
								set: [
									'https://www.forbes.com/sites/jamesconca/2015/12/03/making-climate-change-fashionable-the-garment-industry-takes-on-global-warming/#4f68c4ad79e4',
									'https://about.hm.com/content/dam/hmgroup/groupsite/documents/masterlanguage/CSR/reports/2017%20Sustainability%20report/HM_group_SustainabilityReport_2017_FullReport.pdf',
								],
							},
							tags: {
								set: ['fast fashion', 'CO2', 'verification fournisseurs'],
							},
						},
					},
				},
			},
			causeGrades: {
				create: {
					gradedBy: { connect: { email: 'test@test.com' } },
					cause: 'ENVIRONMENT',
					grade: -2,
				},
			},
		},
	})

	const addCauseGrade2 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test@test.com' } },
			cause: 'ETHICS',
			grade: -2,
		},
	})

	const addCauseGrade3 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test@test.com' } },
			cause: 'FISCAL',
			grade: -2,
		},
	})

	const addCauseGrade4 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test@test.com' } },
			cause: 'SOCIAL',
			grade: -2,
		},
	})

	const actGrade2 = await prisma.actGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test@test.com' } },
			act: 'ECOSYSTEM_PRESERVATION',
			grade: -2,
			affiliatedTo: {
				create: {
					writtenBy: { connect: { email: 'test@test.com' } },
					regardingWho: { connect: { name: 'H&M' } },
					regardingWhat: 'ECOSYSTEM_PRESERVATION',
					title: 'H&M utilise le cellulose',
					text: "Les plus : objectifs sur le sujet, recherche de solutions, 70% des fournisseurs validés par l'assoc Canopé. Les moins : 30% des fournisseurs ne sont pas validés, notamment pour la cellulose qui est apparemment une belle saloperie et puis en plus, 70% des fournisseurs validés ne veut pas dire 70% de la production. Incertain : l'origine du cuir n'est pas spécifiée, ce qui laisse planner un doute énorme sur le sujet...",
					sources: {
						set: [
							'https://about.hm.com/content/dam/hmgroup/groupsite/documents/masterlanguage/CSR/reports/2017 Sustainability report/HM_group_SustainabilityReport_2017_FullReport.pdf',
							'https://www.theguardian.com/sustainable-business/2017/jun/13/hm-zara-marks-spencer-linked-polluting-viscose-factories-asia-fashion',
						],
					},
					tags: { set: ['cellulose', 'association canope', 'cuir'] },
				},
			},
		},
	})

	const company2 = await prisma.company.create({
		data: {
			name: 'Total',
			logo: 'total.png',
		},
	})

	const company3 = await prisma.company.create({
		data: {
			name: 'Mc Donalds',
			logo: 'mcdonalds.png',
		},
	})

	const company4 = await prisma.company.create({
		data: {
			name: 'BNP',
			logo: 'bnp.png',
		},
	})

	const company5 = await prisma.company.create({
		data: {
			name: 'Google',
			logo: 'google.png',
		},
	})

	const company6 = await prisma.company.create({
		data: {
			name: 'Tesla',
			logo: 'tesla.png',
		},
	})

	const company7 = await prisma.company.create({
		data: {
			name: 'Bic',
			logo: 'bic.png',
		},
	})

	const company8 = await prisma.company.create({
		data: {
			name: 'Biocoop',
			logo: 'biocoop.png',
		},
	})

	const company9 = await prisma.company.create({
		data: {
			name: 'Quechua',
			logo: 'quechua.png',
		},
	})

	const company10 = await prisma.company.create({
		data: {
			name: 'Bouygues Telecom',
			logo: 'bouyguestelecom.png',
		},
	})

	const company11 = await prisma.company.create({
		data: {
			name: 'ENGIE',
			logo: 'engie.png',
		},
	})

	const company12 = await prisma.company.create({
		data: {
			name: 'Zalando',
			logo: 'zalando.png',
		},
	})

	const company13 = await prisma.company.create({
		data: {
			name: 'Amazon',
			logo: 'amazon.png',
		},
	})

	const company14 = await prisma.company.create({
		data: {
			name: 'Nike',
			logo: 'nike.png',
		},
	})

	const addCauseGrade5 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test2@test.com' } },
			cause: 'ENVIRONMENT',
			grade: -1,
		},
	})

	const addCauseGrade6 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test2@test.com' } },
			cause: 'ETHICS',
			grade: -1,
		},
	})

	const addCauseGrade7 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test2@test.com' } },
			cause: 'FISCAL',
			grade: -1,
		},
	})

	const addCauseGrade8 = await prisma.causeGrade.create({
		data: {
			gradedTo: { connect: { name: 'H&M' } },
			gradedBy: { connect: { email: 'test2@test.com' } },
			cause: 'SOCIAL',
			grade: -1,
		},
	})

	const companyCategory2 = await prisma.companyCategory.create({
		data: {
			name: 'Automobile',
			companies: { connect: { name: 'Tesla' } },
		},
	})

	const companyCategory3 = await prisma.companyCategory.create({
		data: {
			name: 'Energie',
			companies: { connect: [{ name: 'Total' }, { name: 'ENGIE' }] },
		},
	})

	const companyCategory4 = await prisma.companyCategory.create({
		data: {
			name: 'Mode',
			companies: {
				connect: [
					{ name: 'H&M' },
					{ name: 'Zalando' },
					{ name: 'Zalando' },
					{ name: 'Quechua' },
				],
			},
		},
	})

	const companyCategory5 = await prisma.companyCategory.create({
		data: {
			name: 'Papeterie',
			companies: { connect: { name: 'Bic' } },
		},
	})

	const companyCategory6 = await prisma.companyCategory.create({
		data: {
			name: 'Alimentation',
			companies: { connect: [{ name: 'Mc Donalds' }, { name: 'Biocoop' }] },
		},
	})

	const companyCategory7 = await prisma.companyCategory.create({
		data: {
			name: 'Vente en ligne',
			companies: { connect: { name: 'Amazon' } },
		},
	})

	console.log({
		user1,
		user2,
		company1,
		company2,
		company3,
		company4,
		company5,
		company6,
		company7,
		company8,
		company9,
		company10,
		company11,
		company12,
		company13,
		company14,
		addCauseGrade2,
		addCauseGrade3,
		addCauseGrade4,
		addCauseGrade5,
		addCauseGrade6,
		addCauseGrade7,
		addCauseGrade8,
		companyCategory2,
		companyCategory3,
		companyCategory4,
		companyCategory5,
		companyCategory6,
		companyCategory7,
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
