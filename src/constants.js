// Defines the table of cause and acts for reuse in the app
export const CAUSE_AND_ACTS = {
	ENVIRONMENT: {
		fr: 'Cause Environnementale',
		acts: ['CLIMAT_CHANGE', 'ECOSYSTEM_PRESERVATION', 'RESOURCE_PRESERVATION'],
	},
	CLIMAT_CHANGE: {
		fr: 'Implication dans le changement climatique',
	},
	ECOSYSTEM_PRESERVATION: {
		fr: 'Préservation des écosystèmes',
	},
	RESOURCE_PRESERVATION: {
		fr: 'Préservation des ressources',
	},
	ANIMALS: {
		fr: 'Cause animale',
		acts: ['ANIMAL_EXPERIMENTATION', 'ANIMAL_RESOURCES', 'ANIMAL_WELFARE'],
	},
	ANIMAL_EXPERIMENTATION: {
		fr: 'Expériences sur les animaux',
	},
	ANIMAL_RESOURCES: {
		fr: 'Utilisation de fourrures et autres',
	},
	ANIMAL_WELFARE: {
		fr: 'Bien être animal',
	},
	ETHICS: {
		fr: 'Cause éthique',
		acts: [
			'POLITICAL_RESPONSIBILITY',
			'MARKET_INFLUENCE',
			'POPULATION_RESPECT',
			'CONSUMER_RESPECT',
			'QUESTIONABLE_INDUSTRIES',
		],
	},
	POLITICAL_RESPONSIBILITY: {
		fr: 'Responsabilité politique',
	},
	MARKET_INFLUENCE: {
		fr: 'Influence du marché',
	},
	POPULATION_RESPECT: {
		fr: 'Respect des populations',
	},
	CONSUMER_RESPECT: {
		fr: 'Respect du consommateur',
	},
	QUESTIONABLE_INDUSTRIES: {
		fr: 'Industries critiquables et/ou technologies critiquables',
	},
	FISCAL: {
		fr: 'Fiscalité & Gouvernance',
		acts: [
			'SHAREHOLDER_REMUNERATION',
			'TAXATION_LEVEL',
			'EXECUTIVE_COMPENSATION',
			'EMPLOYEE_EQUITY',
		],
	},
	SHAREHOLDER_REMUNERATION: {
		fr: "Taux de rémunération de l'actionnariat",
	},
	TAXATION_LEVEL: {
		fr: "Taux d'imposition",
	},
	EXECUTIVE_COMPENSATION: {
		fr: 'Surémunération des dirigeants',
	},
	EMPLOYEE_EQUITY: {
		fr: 'Participation des salariés',
	},
	SOCIAL: {
		fr: 'Cause Sociale',
		acts: [
			'EMPLOYMENT_CONDITIONS',
			'EMPLOYEE_DISCRIMINATIONS',
			'WORKING_CONDITIONS',
			'MANAGING_CONDITIONS',
		],
	},
	EMPLOYMENT_CONDITIONS: {
		fr: 'Conditions salariales',
	},
	EMPLOYEE_DISCRIMINATIONS: {
		fr: 'Discriminations',
	},
	WORKING_CONDITIONS: {
		fr: 'Conditions de travail',
	},
	MANAGING_CONDITIONS: {
		fr: 'Management et Epanouïssement salarial',
	},
}

export const STATUS = {
	ASLEEP: {
		fr: 'Panda Endormi',
	},
	AWAKEN: {
		fr: 'Panda Eveillé',
	},
	SACRED: {
		fr: 'Panda Sacré',
	},
	SAINT: {
		fr: 'Saint Panda',
	},
}

export const GRADES_TO_WORDS = {
	WORST: {
		global: {
			fr: 'Très Mauvais Karma',
		},
		cause: {
			fr: 'Très Mauvais Karma',
		},
		act: {
			fr: 'Très Maléfique',
		},
	},
	BAD: {
		global: {
			fr: 'Plutôt Mauvais Karma',
		},
		cause: {
			fr: 'Plutôt Mauvais Karma',
		},
		act: {
			fr: 'Plutôt Maléfique',
		},
	},
	NEUTRAL: {
		global: {
			fr: 'Karma Neutre',
		},
		cause: {
			fr: 'Karma Neutre',
		},
		act: {
			fr: 'Mouais...',
		},
	},
	GOOD: {
		global: {
			fr: 'Plutôt Bon Karma',
		},
		cause: {
			fr: 'Plutôt Bon Karma',
		},
		act: {
			fr: 'Plutôt Bénéfique',
		},
	},
	BEST: {
		global: {
			fr: 'Très Bon Karma',
		},
		cause: {
			fr: 'Très Bon Karma',
		},
		act: {
			fr: 'Très Bénéfique',
		},
	},
}

export const AUTH_TOKEN = 'auth-token_toBeHidden'
